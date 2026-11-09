/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== `POST`) {
    return res.status(405)
      .json({
        error: `Method not allowed`,
      });
  }

  const {
    to,
    subject,
    message,
    html,
    token,
  } = req.body;

  if (process.env.NEXT_PUBLIC_ENABLE_SMARTCAPTCHA === `true`) {
    const formData = new URLSearchParams();
    formData.append(`secret`, process.env.SMARTCAPTCHA_SERVER_KEY as string);
    formData.append(`token`, token);

    const response = await fetch(`https://smartcaptcha.yandexcloud.net/validate`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (responseData.status !== `ok`) {
      return res.status(400)
        .json({
          error: `Invalid captcha token`,
        });
    }
  }

  try {
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
