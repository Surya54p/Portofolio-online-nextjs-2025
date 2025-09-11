import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // bisa ganti sesuai provider SMTP kamu
    auth: {
      user: process.env.EMAIL_USER, // email pengirim
      pass: process.env.EMAIL_PASS, // app password Gmail atau SMTP key
    },
  });

  await transporter.sendMail({
    from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
