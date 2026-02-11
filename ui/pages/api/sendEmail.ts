/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      to, subject, message, html,
    } = req.body;

    // Create Mail.ru transporter
    const transporter = nodemailer.createTransport({
      host: `smtp.mail.ru`,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILRU_EMAIL,
        pass: process.env.MAILRU_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Tourmaline core" ${process.env.MAILRU_EMAIL}`,
      to,
      subject,
      message,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200)
      .json({
        success: true,
        messageId: info.messageId,
      });
  } catch (error: any) {
    console.error(`Error sending email:`, error);
    return res.status(500)
      .json({
        success: false,
        message: `Error sending email`,
        error: error.message,
      });
  }
}
