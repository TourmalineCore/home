import { NextApiRequest, NextApiResponse } from 'next';
import { cmsFetch } from '../../services/cms/api/http-client';

// It is needed in order to save cookie consent to Strapi.
export default async function saveCookieConsent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== `POST`) {
    return res.status(405)
      .json({
        error: `Method not allowed`,
      });
  }

  const {
    consentId,
    consentVersion,
    categories,
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
    await cmsFetch<Response>(`/cookie-consents`, {
      method: `POST`,
      body: JSON.stringify({
        data: {
          consentId,
          consentVersion,
          categories,
        },
      }),
    });

    return res.status(200)
      .json({
        success: true,
      });
  } catch (error) {
    return res.status(500)
      .json({
        error: `Internal server error`,
      });
  }
}
