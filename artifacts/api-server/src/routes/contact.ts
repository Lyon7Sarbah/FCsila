import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import pool from "../lib/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const {
    parent_name, phone, email, child_name,
    child_age, group, experience, medical, lang
  } = req.body;

  if (!parent_name || !phone || !email || !child_name || !child_age) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const isRu = lang === "ru";

  // Save to database first
  let registrationId: number | null = null;
  try {
    const dbResult = await pool.query(
      `INSERT INTO registrations
        (parent_name, phone, email, child_name, child_age, age_group, experience, medical, lang, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'pending')
       RETURNING id`,
      [parent_name, phone, email, child_name, child_age, group || null, experience || null, medical || null, lang || 'ru']
    );
    registrationId = dbResult.rows[0].id;
  } catch (dbErr: any) {
    console.error("DB save error:", dbErr?.message);
  }

  // Send email notification
  const subject = isRu
    ? `Новая заявка #${registrationId} — ${child_name}, ${child_age}`
    : `New Registration #${registrationId} — ${child_name}, Age ${child_age}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; background: #000; color: #fff; padding: 30px; border: 2px solid #FDE100; border-radius: 12px;">
      <h2 style="color: #FDE100; margin-top: 0;">⚽ ${isRu ? "Новая заявка в Академию ФК Сила" : "New FC SILA Academy Registration"}${registrationId ? ` <span style="color:#888; font-size:16px;">#${registrationId}</span>` : ""}</h2>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Имя родителя" : "Parent Name"}</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${parent_name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Телефон" : "Phone"}</td><td style="padding: 8px 0; color: #FDE100;">${phone}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0; color: #FDE100;"><a href="mailto:${email}" style="color: #FDE100;">${email}</a></td></tr>
        <tr><td colspan="2" style="border-top: 1px solid #222; padding-top: 12px;"></td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Имя ребёнка" : "Child Name"}</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${child_name}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Возраст" : "Age"}</td><td style="padding: 8px 0; color: #FDE100;">${child_age}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Группа" : "Group"}</td><td style="padding: 8px 0; color: #fff;">${group || "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Опыт" : "Experience"}</td><td style="padding: 8px 0; color: #fff;">${experience || "—"}</td></tr>
        ${medical ? `<tr><td colspan="2" style="border-top: 1px solid #222; padding-top: 12px;"></td></tr><tr><td style="padding: 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">${isRu ? "Мед. информация" : "Medical Info"}</td><td style="padding: 8px 0; color: #fff;">${medical}</td></tr>` : ""}
      </table>

      <p style="margin-top: 24px; color: #555; font-size: 12px;">— FC SILA Academy Registration System</p>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fcsilamoscow@gmail.com",
        pass: process.env["GMAIL_APP_PASSWORD"],
      },
    });

    await transporter.sendMail({
      from: '"FC SILA Academy" <fcsilamoscow@gmail.com>',
      to: "fcsilamoscow@gmail.com",
      replyTo: email,
      subject,
      html: htmlBody,
    });
  } catch (err: any) {
    console.error("Email send error:", err?.message);
  }

  res.json({ success: true, id: registrationId });
});

export default router;
