import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { randomBytes } from "crypto";
import nodemailer from "nodemailer";
import pool from "../lib/db";

const router: IRouter = Router();

const VALID_STATUSES = ['pending', 'accepted', 'waitlisted', 'rejected', 'trial_booked'];

// --- Session store (in-memory, resets on server restart) ---
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

interface Session {
  expiresAt: number;
}

const sessions = new Map<string, Session>();

function createSession(): string {
  const token = randomBytes(32).toString('hex');
  sessions.set(token, { expiresAt: Date.now() + SESSION_TTL_MS });
  return token;
}

function isValidSession(token: string): boolean {
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

// Periodic cleanup of expired sessions (runs every hour)
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (now > session.expiresAt) sessions.delete(token);
  }
}, 60 * 60 * 1000).unref();

// --- In-route rate limiter (defense-in-depth; express-rate-limit also applied globally) ---
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_MAX_ATTEMPTS = 10;

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return false; // not limited
  }
  entry.count += 1;
  return entry.count > LOGIN_MAX_ATTEMPTS;
}

function resetLoginRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

// --- Auth middleware ---
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token || !isValidSession(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

function auditLog(event: string, ip: string, detail?: string) {
  const ts = new Date().toISOString();
  console.log(`[ADMIN AUDIT] ${ts} event=${event} ip=${ip}${detail ? ` ${detail}` : ''}`);
}

// POST /api/admin/login
router.post('/admin/login', (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();

  if (checkLoginRateLimit(ip)) {
    auditLog('LOGIN_RATE_LIMITED', ip);
    res.status(429).json({ error: 'Too many login attempts. Please wait 15 minutes.' });
    return;
  }

  const { password } = req.body;
  const adminPassword = process.env['ADMIN_PASSWORD'] || '';

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD secret is not configured');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  if (!password || password !== adminPassword) {
    auditLog('LOGIN_FAILED', ip);
    res.status(401).json({ error: 'Invalid password' });
    return;
  }

  resetLoginRateLimit(ip);
  const token = createSession();
  auditLog('LOGIN_SUCCESS', ip);
  res.json({ token });
});

// POST /api/admin/logout
router.post('/admin/logout', requireAdmin, (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  sessions.delete(token);
  auditLog('LOGOUT', ip);
  res.json({ success: true });
});

// GET /api/admin/stats
router.get('/admin/stats', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS all,
        COUNT(*) FILTER (WHERE status = 'pending')::int AS pending,
        COUNT(*) FILTER (WHERE status = 'accepted')::int AS accepted,
        COUNT(*) FILTER (WHERE status = 'waitlisted')::int AS waitlisted,
        COUNT(*) FILTER (WHERE status = 'rejected')::int AS rejected,
        COUNT(*) FILTER (WHERE status = 'trial_booked')::int AS trial_booked,
        COUNT(*) FILTER (WHERE age_group = '7-10')::int AS "ageCounts_7_10",
        COUNT(*) FILTER (WHERE age_group = '11-15')::int AS "ageCounts_11_15",
        COUNT(*) FILTER (WHERE age_group = '11-16')::int AS "ageCounts_11_16"
      FROM registrations
    `);
    const row = result.rows[0];
    res.json({
      all: row.all,
      pending: row.pending,
      accepted: row.accepted,
      waitlisted: row.waitlisted,
      rejected: row.rejected,
      trial_booked: row.trial_booked,
      ageCounts: {
        all: row.all,
        '7-10': row['ageCounts_7_10'],
        '11-15': row['ageCounts_11_15'],
        '11-16': row['ageCounts_11_16'],
      },
    });
  } catch (err: any) {
    console.error('Admin stats error:', err?.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/registrations
router.get('/admin/registrations', requireAdmin, async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const age_group = req.query.age_group as string | undefined;
    const search = req.query.search as string | undefined;
    const limit = (req.query.limit as string) || '200';
    const offset = (req.query.offset as string) || '0';
    let where = 'WHERE 1=1';
    const params: any[] = [];
    let idx = 1;

    if (status && status !== 'all') {
      where += ` AND status = $${idx++}`;
      params.push(status);
    }
    if (age_group && age_group !== 'all') {
      if (age_group === '11-16') {
        where += ` AND age_group IN ('11-15', '11-16')`;
      } else {
        where += ` AND age_group = $${idx++}`;
        params.push(age_group);
      }
    }
    if (search) {
      where += ` AND (child_name ILIKE $${idx} OR parent_name ILIKE $${idx} OR phone ILIKE $${idx} OR email ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM registrations ${where}`, params
    );

    params.push(parseInt(limit, 10), parseInt(offset, 10));
    const result = await pool.query(
      `SELECT * FROM registrations ${where}
       ORDER BY created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      params
    );

    res.json({
      total: parseInt(countResult.rows[0].total, 10),
      rows: result.rows,
    });
  } catch (err: any) {
    console.error('Admin GET error:', err?.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH /api/admin/registrations/:id
router.patch('/admin/registrations/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (status && !VALID_STATUSES.includes(status)) {
    res.status(400).json({ error: 'Invalid status' });
    return;
  }

  try {
    const fields: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (status) { fields.push(`status = $${idx++}`); params.push(status); }
    if (notes !== undefined) { fields.push(`notes = $${idx++}`); params.push(notes); }
    fields.push(`updated_at = NOW()`);

    params.push(parseInt(id, 10));
    const result = await pool.query(
      `UPDATE registrations SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      params
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error('Admin PATCH error:', err?.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/admin/registrations/:id
router.delete('/admin/registrations/:id', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM registrations WHERE id = $1', [parseInt(id, 10)]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error' });
  }
});

function csvCell(value: unknown): string {
  const str = value == null ? '' : String(value);
  const FORMULA_CHARS = /^[=+\-@\t\r]/;
  const safe = FORMULA_CHARS.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

// GET /api/admin/export.csv
router.get('/admin/export.csv', requireAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, child_name, child_age, age_group, experience,
              parent_name, phone, email, medical, lang, status, notes, created_at
       FROM registrations ORDER BY created_at DESC`
    );

    const headers = ['ID','Child Name','Age Group','Experience','Parent Name','Phone','Email','Medical','Language','Status','Notes','Submitted At'];
    const rows = result.rows.map(r => [
      csvCell(r.id),
      csvCell(r.child_name),
      csvCell(r.age_group),
      csvCell(r.experience),
      csvCell(r.parent_name),
      csvCell(r.phone),
      csvCell(r.email),
      csvCell(r.medical),
      csvCell(r.lang),
      csvCell(r.status),
      csvCell(r.notes),
      csvCell(new Date(r.created_at).toISOString()),
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="registrations-${new Date().toISOString().slice(0,10)}.csv"`);
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/registrations/:id/send-agreement
router.post('/admin/registrations/:id/send-agreement', requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM registrations WHERE id = $1', [parseInt(id, 10)]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Registration not found' });
      return;
    }
    const r = result.rows[0];
    const fee = r.age_group === '7-10' ? '10 000 руб. / 10,000 RUB' : '12 000 руб. / 12,000 RUB';
    const trialFee = '2 000 руб. / 2,000 RUB';
    const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const group = r.age_group === '7-10'
      ? 'Foundation (Фундамент) 7–10 лет'
      : (r.age_group === '11-15' || r.age_group === '11-16')
      ? 'Development (Развитие) 11–16 лет'
      : r.age_group || '—';

    const htmlAgreement = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Договор FC SILA Academy</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Arial',sans-serif;">
<div style="max-width:720px;margin:0 auto;background:#fff;border-top:6px solid #FDE100;">

  <!-- Header -->
  <div style="background:#000;padding:36px 40px 28px;text-align:center;">
    <div style="font-size:28px;font-weight:900;color:#fff;letter-spacing:3px;text-transform:uppercase;">FC SILA MOSCOW</div>
    <div style="font-size:12px;font-weight:700;color:#FDE100;letter-spacing:4px;text-transform:uppercase;margin-top:6px;">АКАДЕМИЯ · ACADEMY</div>
    <div style="margin-top:16px;display:inline-block;background:#FDE100;color:#000;font-size:11px;font-weight:900;letter-spacing:2px;text-transform:uppercase;padding:6px 18px;border-radius:4px;">
      ДОГОВОР ЗАЧИСЛЕНИЯ · REGISTRATION AGREEMENT
    </div>
    <div style="color:#555;font-size:12px;margin-top:12px;">Дата / Date: ${today} · Заявка / Application #${r.id}</div>
  </div>

  <!-- Intro -->
  <div style="padding:32px 40px 0;">
    <p style="color:#333;font-size:13px;line-height:1.8;margin:0 0 8px;">
      Настоящий договор заключён между <strong>ФК СИЛА Москва</strong> (далее «Академия») и Родителем/Законным представителем, указанным ниже, от имени Ребёнка (далее «Игрок»).
    </p>
    <p style="color:#888;font-size:12px;line-height:1.6;margin:0;">
      This Agreement is made between <strong>FC SILA Moscow</strong> ("the Academy") and the Parent/Guardian named below, on behalf of the Child ("the Player").
    </p>
    <div style="border:1px solid #eee;margin:16px 0;"></div>
    <div style="font-size:11px;color:#999;margin-bottom:0;">
      140009, Московская обл., Люберцы, д. Мотяково, СНТСН Ёлочка, д. 38а, помещение 1<br>
      ОГРН: 1207700105073 · ИНН: 9715380269 · Генеральный директор: Шишелов Владислав Олегович
    </div>
  </div>

  <!-- 1. Player Info -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      1. Информация об игроке · Player Information
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;width:45%;">Полное имя / Full Name</td>
        <td style="padding:8px 0;font-weight:700;color:#111;">${r.child_name}</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Возраст / Age</td>
        <td style="padding:8px 0;color:#111;">${r.child_age}</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Группа / Age Group</td>
        <td style="padding:8px 0;font-weight:700;color:#000;background-color:#fffbe6;padding-left:8px;">${group}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#888;">Мед. информация / Medical</td>
        <td style="padding:8px 0;color:#111;">${r.medical || 'Нет / None'}</td>
      </tr>
    </table>
  </div>

  <!-- 2. Parent Info -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      2. Информация о родителе · Parent/Guardian Information
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;width:45%;">Полное имя / Full Name</td>
        <td style="padding:8px 0;font-weight:700;color:#111;">${r.parent_name}</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Телефон / Phone</td>
        <td style="padding:8px 0;color:#111;">${r.phone}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#888;">Email</td>
        <td style="padding:8px 0;color:#111;">${r.email}</td>
      </tr>
    </table>
  </div>

  <!-- 3. Program Details -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      3. Детали программы · Program Details
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;width:45%;">Расписание / Schedule</td>
        <td style="padding:8px 0;color:#111;">Каждую субботу / Every Saturday</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Длительность / Duration</td>
        <td style="padding:8px 0;color:#111;">2 часа / 2 hours</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Ежемесячный взнос / Monthly Fee</td>
        <td style="padding:8px 0;font-weight:900;color:#000;background:#fffbe6;padding-left:8px;">${fee}</td>
      </tr>
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 0;color:#888;">Пробное занятие / Trial Fee</td>
        <td style="padding:8px 0;color:#111;">${trialFee} <span style="color:#888;font-size:11px;">(засчитывается при зачислении / deducted if enrolled)</span></td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#888;">Включено / Included</td>
        <td style="padding:8px 0;color:#111;">Тренировки, товарищеские матчи, аренда поля, базовое оборудование / Training, friendly matches, pitch rental, basic equipment</td>
      </tr>
    </table>
  </div>

  <!-- 4. Payment Terms -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      4. Условия оплаты · Payment Terms
    </div>
    <ul style="color:#333;font-size:13px;line-height:2;margin:0;padding-left:20px;">
      <li>Оплата вносится до первой субботы каждого месяца / Fee due on or before the 1st Saturday of each month.</li>
      <li>Способы оплаты: наличные (с чеком), банковский перевод, онлайн-оплата / Cash (receipt provided), bank transfer, online payment.</li>
      <li>Возврат за пропущенные тренировки не производится / No refunds for missed sessions.</li>
      <li>Просрочка оплаты свыше 14 дней — возможна приостановка занятий / Late payments over 14 days may result in suspension.</li>
      <li>Академия вправе изменить тариф с предупреждением за 30 дней / Academy may adjust fees with 30 days written notice.</li>
    </ul>
  </div>

  <!-- 5. Player Code of Conduct -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      5. Правила поведения — Игрок · Player Code of Conduct
    </div>
    <ul style="color:#333;font-size:13px;line-height:2;margin:0;padding-left:20px;">
      <li>Приходить вовремя в полной экипировке (щитки, бутсы, вода) / Attend on time, in proper kit.</li>
      <li>Уважать тренеров, партнёров по команде, судей / Respect coaches, teammates, and referees.</li>
      <li>Слушать инструкции и максимально выкладываться на тренировках / Follow instructions and give full effort.</li>
      <li>Без нецензурной лексики, драк, травли, неспортивного поведения / No swearing, fighting, bullying or unsporting behavior.</li>
      <li>Бережно относиться к оборудованию и инфраструктуре / Take care of equipment and facilities.</li>
      <li>Предупреждать тренера о пропуске занятия / Inform the coach before any absence.</li>
    </ul>
    <p style="color:#888;font-size:12px;margin-top:8px;">
      Нарушения: 1-е — устное предупреждение; 2-е — встреча с родителями; 3-е — отстранение (без возврата взноса).<br>
      Violations: 1st verbal warning · 2nd parent meeting · 3rd suspension (no refund).
    </p>
  </div>

  <!-- 6. Parent Code of Conduct -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      6. Правила поведения — Родитель · Parent Code of Conduct
    </div>
    <ul style="color:#333;font-size:13px;line-height:2;margin:0;padding-left:20px;">
      <li>Своевременно приводить и забирать ребёнка / Drop off and pick up the Player on time.</li>
      <li>Своевременно вносить оплату / Pay fees promptly.</li>
      <li>Сообщать об отсутствии или проблемах со здоровьем за 24 часа / Notify absences/medical issues 24 hours in advance.</li>
      <li>Поддерживать ребёнка позитивно — не кричать на тренеров или других детей / Support the Player positively — no yelling at coaches or children.</li>
      <li>Находиться в отведённой зоне для зрителей / Stay behind designated viewing areas.</li>
      <li>Уважать футбольные решения тренеров / Respect that coaches make all football decisions.</li>
    </ul>
    <p style="color:#888;font-size:12px;margin-top:8px;">
      Нарушения: 1-е — предупреждение; 2-е — отстранение от посещения; 3-е — возможно исключение Игрока (без возврата взноса).<br>
      Violations: 1st warning · 2nd suspension from attending · 3rd Player's enrollment may be terminated (no refund).
    </p>
  </div>

  <!-- 7. Medical Consent -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      7. Медицинское согласие · Medical &amp; Emergency Consent
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0;">
      Я, Родитель, даю полное согласие на оказание Академией экстренной медицинской помощи Игроку при необходимости, включая вызов скорой помощи. Я подтверждаю, что все известные мне медицинские противопоказания указаны выше. Академия не несёт ответственности за медицинские расходы.<br>
      <span style="color:#888;font-size:12px;">I give consent for the Academy to seek emergency medical treatment if needed. The Academy is not responsible for any medical costs incurred.</span>
    </p>
  </div>

  <!-- 8. Liability Waiver -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      8. Ограничение ответственности · Liability Waiver
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0;">
      Я понимаю и принимаю, что футбол сопряжён с рисками травм. Академия принимает разумные меры предосторожности, однако не может гарантировать полное отсутствие травм. Я освобождаю ФК СИЛА Москва, тренеров, сотрудников и волонтёров от ответственности за травмы, кроме случаев грубой халатности или умышленного причинения вреда. Академия не несёт ответственности за потерю или повреждение личных вещей.<br>
      <span style="color:#888;font-size:12px;">Football involves inherent risks. The Academy takes reasonable precautions but cannot guarantee no injury. I release FC SILA Moscow from liability except in cases of gross negligence. The Academy is not responsible for lost/damaged personal items.</span>
    </p>
  </div>

  <!-- 9. Photo Consent -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      9. Согласие на фото/видео (необязательно) · Photo &amp; Video Consent (Optional)
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0 0 12px;">
      Пожалуйста, отметьте один из вариантов и верните подписанный договор / Please tick one option and return the signed agreement:
    </p>
    <p style="font-size:13px;color:#333;margin:6px 0;">☐ &nbsp;<strong>ДА / YES</strong> — Я разрешаю Академии использовать фото и видео с Игроком в рекламных целях (сайт, соцсети). / I give permission for photos/videos to be used for promotional purposes.</p>
    <p style="font-size:13px;color:#333;margin:6px 0;">☐ &nbsp;<strong>НЕТ / NO</strong> — Я не разрешаю публичное использование фото и видео с Игроком. / I do NOT give permission for public use of photos/videos.</p>
    <p style="color:#888;font-size:11px;margin-top:8px;">Имена не публикуются рядом с фото без отдельного письменного согласия / No names published alongside images without additional consent.</p>
  </div>

  <!-- 10. Communication -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      10. Коммуникация · Communication
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0;">
      Академия использует WhatsApp/Telegram-группу (основной канал) и email (дополнительный). Родитель обязуется вступить в группу и регулярно проверять сообщения. Академия не несёт ответственности за пропущенную информацию.<br>
      <span style="color:#888;font-size:12px;">The Academy communicates via WhatsApp/Telegram (primary) and email (secondary). The Parent agrees to join the group and check messages regularly.</span>
    </p>
  </div>

  <!-- 11. Termination -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      11. Прекращение договора · Termination
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0;">
      Любая из сторон вправе расторгнуть договор с уведомлением за 14 дней. Академия вправе расторгнуть договор немедленно без возврата взноса при: просрочке оплаты более 30 дней, грубом нарушении правил поведения, прекращении деятельности Академии.<br>
      <span style="color:#888;font-size:12px;">Either party may terminate with 14 days notice. The Academy may terminate immediately without refund for overdue fees (30+ days), serious conduct violations, or Academy closure.</span>
    </p>
  </div>

  <!-- 12. Force Majeure -->
  <div style="padding:24px 40px 0;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:12px;">
      12. Форс-мажор · Force Majeure
    </div>
    <p style="color:#333;font-size:13px;line-height:1.9;margin:0;">
      Академия не несёт ответственности за отмену или перенос занятий вследствие экстремальных погодных условий, государственных ограничений, недоступности объекта или иных обстоятельств непреодолимой силы. В случае отмены занятий академия обязуется уведомить родителей по возможности заблаговременно и организовать компенсирующую сессию или выдать кредит при отмене более двух занятий подряд.<br>
      <span style="color:#888;font-size:12px;">The Academy is not liable for session cancellations due to extreme weather, government restrictions, facility unavailability, or other force majeure. Makeup sessions or credits will be arranged for 2+ consecutive cancellations.</span>
    </p>
  </div>

  <!-- Signature -->
  <div style="padding:32px 40px 40px;">
    <div style="font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#FDE100;border-bottom:2px solid #FDE100;padding-bottom:6px;margin-bottom:20px;">
      Подписи · Signatures
    </div>
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="width:48%;vertical-align:top;padding-right:16px;">
          <p style="font-size:12px;color:#555;margin:0 0 40px;">Родитель/Законный представитель<br><span style="color:#999;">Parent/Guardian</span></p>
          <div style="border-top:1px solid #ccc;padding-top:8px;">
            <p style="font-size:12px;color:#333;margin:0;">${r.parent_name}</p>
            <p style="font-size:10px;color:#999;margin:4px 0 0;">Дата / Date: ___________</p>
          </div>
        </td>
        <td style="width:4%;"></td>
        <td style="width:48%;vertical-align:top;">
          <p style="font-size:12px;color:#555;margin:0 0 40px;">FC SILA Moscow<br><span style="color:#999;">Authorised Representative</span></p>
          <div style="border-top:1px solid #ccc;padding-top:8px;">
            <p style="font-size:12px;color:#333;margin:0;">Шишелов Владислав Олегович</p>
            <p style="font-size:10px;color:#999;margin:4px 0 0;">Дата / Date: ___________</p>
          </div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="background:#000;padding:20px 40px;text-align:center;">
    <div style="font-size:10px;color:#555;letter-spacing:1px;">FC SILA MOSCOW · fcsila.ru · info@fcsila.ru</div>
    <div style="font-size:9px;color:#333;margin-top:4px;">Этот документ является официальным договором / This document constitutes a binding agreement</div>
  </div>

</div>
</body>
</html>`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fcsilamoscow@gmail.com',
        pass: process.env['GMAIL_APP_PASSWORD'],
      },
    });

    await transporter.sendMail({
      from: '"FC SILA Moscow Academy" <fcsilamoscow@gmail.com>',
      to: r.email,
      subject: `FC SILA Moscow – Registration Agreement / Договор зачисления #${r.id}`,
      html: htmlAgreement,
    });

    const updated = await pool.query(
      `UPDATE registrations SET agreement_sent_at = NOW() WHERE id = $1 RETURNING *`,
      [parseInt(id, 10)]
    );

    res.json({ success: true, row: updated.rows[0] });
  } catch (err: any) {
    console.error('Send agreement error:', err?.message);
    res.status(500).json({ error: 'Failed to send agreement email' });
  }
});

export default router;
