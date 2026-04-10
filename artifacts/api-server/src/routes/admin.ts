import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import pool from "../lib/db";

const router: IRouter = Router();

const VALID_STATUSES = ['pending', 'accepted', 'waitlisted', 'rejected', 'trial_booked'];

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  const adminPassword = process.env['ADMIN_PASSWORD'] || '';
  if (!adminPassword || token !== adminPassword) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

// POST /api/admin/login
router.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const adminPassword = process.env['ADMIN_PASSWORD'] || '';
  if (!password || password !== adminPassword) {
    res.status(401).json({ error: 'Invalid password' });
    return;
  }
  res.json({ token: adminPassword });
});

// GET /api/admin/registrations
router.get('/admin/registrations', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status, search, limit = '200', offset = '0' } = req.query as Record<string, string>;
    let where = 'WHERE 1=1';
    const params: any[] = [];
    let idx = 1;

    if (status && status !== 'all') {
      where += ` AND status = $${idx++}`;
      params.push(status);
    }
    if (search) {
      where += ` AND (child_name ILIKE $${idx} OR parent_name ILIKE $${idx} OR phone ILIKE $${idx} OR email ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM registrations ${where}`, params
    );

    params.push(parseInt(limit), parseInt(offset));
    const result = await pool.query(
      `SELECT * FROM registrations ${where}
       ORDER BY created_at DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      params
    );

    res.json({
      total: parseInt(countResult.rows[0].total),
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

    params.push(parseInt(id));
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
    await pool.query('DELETE FROM registrations WHERE id = $1', [parseInt(id)]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/admin/registrations/export.csv
router.get('/admin/export.csv', requireAdmin, async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, child_name, child_age, age_group, experience,
              parent_name, phone, email, medical, lang, status, notes, created_at
       FROM registrations ORDER BY created_at DESC`
    );

    const headers = ['ID','Child Name','Age Group','Experience','Parent Name','Phone','Email','Medical','Language','Status','Notes','Submitted At'];
    const rows = result.rows.map(r => [
      r.id,
      `"${(r.child_name || '').replace(/"/g, '""')}"`,
      r.age_group || '',
      r.experience || '',
      `"${(r.parent_name || '').replace(/"/g, '""')}"`,
      r.phone || '',
      r.email || '',
      `"${(r.medical || '').replace(/"/g, '""')}"`,
      r.lang || '',
      r.status || '',
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      new Date(r.created_at).toISOString(),
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="registrations-${new Date().toISOString().slice(0,10)}.csv"`);
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// GET /api/admin/stats
router.get('/admin/stats', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT status, COUNT(*) as count FROM registrations GROUP BY status`
    );
    const stats: Record<string, number> = { all: 0, pending: 0, accepted: 0, waitlisted: 0, rejected: 0, trial_booked: 0 };
    for (const row of result.rows) {
      stats[row.status] = parseInt(row.count);
      stats.all += parseInt(row.count);
    }
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
