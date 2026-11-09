import { NextApiRequest, NextApiResponse } from 'next';
import { cmsFetch } from '../../services/cms/api/http-client';
import { getZooMapSurveyResponseData } from '../../components/zooMapSurvey/ZooMapSurvey/getZooMapSurveyResponseData';

export const config = {
  api: {
    bodyParser: {
      // A full response is well below this limit, the default one is 1mb
      sizeLimit: `100kb`,
    },
  },
};

// It is needed in order to save a zoo map survey response to Strapi.
export default async function saveZooMapSurveyResponse(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== `POST`) {
    return res.status(405)
      .json({
        error: `Method not allowed`,
      });
  }

  // Rejects cross-site form posts, which can't be sent as JSON, and bodies that aren't an object
  const isJsonObject = req.headers[`content-type`]?.startsWith(`application/json`)
    && typeof req.body === `object`
    && req.body !== null
    && !Array.isArray(req.body);

  if (!isJsonObject) {
    return res.status(400)
      .json({
        error: `Invalid request`,
      });
  }

  const {
    choices,
    texts,
    token,
  } = req.body;

  const data = getZooMapSurveyResponseData({
    choices,
    texts,
  });

  if (Object.keys(data).length === 0) {
    return res.status(400)
      .json({
        error: `Empty response`,
      });
  }

  if (process.env.NEXT_PUBLIC_ENABLE_SMARTCAPTCHA === `true`) {
    const isCaptchaTokenValid = typeof token === `string`
      && token !== ``
      && await validateCaptchaToken(token);

    if (!isCaptchaTokenValid) {
      return res.status(400)
        .json({
          error: `Invalid captcha token`,
        });
    }
  }

  try {
    const response = await cmsFetch<Response>(`/zoo-map-survey-responses`, {
      method: `POST`,
      body: JSON.stringify({
        data,
      }),
    });

    // cmsFetch returns null on 404, which means the CMS doesn't have the collection and nothing was saved
    if (!response) {
      throw new Error(`Zoo map survey responses collection not found`);
    }

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

async function validateCaptchaToken(token: string) {
  const formData = new URLSearchParams();
  formData.append(`secret`, process.env.SMARTCAPTCHA_SERVER_KEY as string);
  formData.append(`token`, token);

  try {
    const response = await fetch(`https://smartcaptcha.yandexcloud.net/validate`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
      },
      body: formData,
    });

    const responseData = await response.json();

    return responseData.status === `ok`;
  } catch {
    // If the captcha service is unavailable the response is rejected rather than saved unchecked
    return false;
  }
}
