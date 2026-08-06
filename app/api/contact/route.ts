import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: "mxf97d.netcup.net",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: "info@nearbase.de",
    subject: `Neue Kontaktanfrage: ${data.type === "message" ? "Nachricht" : data.type === "consultation" ? "Erstgespräch" : "Rückruf"}`,
    text: JSON.stringify(data, null, 2),
  });

  return NextResponse.json({ success: true });
}