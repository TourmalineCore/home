import { NextApiRequest, NextApiResponse } from "next";

export default async function validateCaptchaToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      token,
    } = req.body;

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

    if (responseData.status === `ok`) {
      return res.status(200)
        .json(responseData);
    }

    return res.status(400)
      .json({
        status: `failed`,
        message: responseData.message || `Captcha verification failed`,
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Captcha verification error:`, error);
    return res.status(500)
      .json({
        status: `failed`,
        message: `Server error during captcha check`,
      });
  }
}
