import { NextApiRequest, NextApiResponse } from 'next';
import { cmsFetch } from '../../services/cms/api/http-client';

// It is needed in order to save cookie consent to Strapi.
export default async function saveCookieConsent(req: NextApiRequest, res: NextApiResponse) {
  const {
    consentId,
    consentVersion,
    categories,
  } = req.body;

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

    res.status(200)
      .json({
        success: true,
      });
  } catch (error) {
    res.status(500)
      .json({
        error: `Internal server error`,
      });
  }
}
