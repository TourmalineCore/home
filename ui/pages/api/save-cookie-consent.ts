import { NextApiRequest, NextApiResponse } from 'next';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { cmsFetch } from '../../services/cms/api/http-client';

const rateLimiter = new RateLimiterMemory({
  points: 3, // number of allowed requests
  duration: 30, // 3 requests in 30 seconds,
  blockDuration: 300, // blocking time 300 seconds (5 minutes)
});

function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers[`x-forwarded-for`];
  if (forwarded && typeof forwarded === `string`) {
    return forwarded.split(`,`)[0];
  }
  return req.socket.remoteAddress || `unknown`;
}

// It is needed in order to save cookie consent to Strapi.
export default async function saveCookieConsent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== `POST`) {
    res.status(405)
      .json({
        error: `Method not allowed`,
      });
  }

  const {
    consentId,
    consentVersion,
    categories,
  } = req.body;

  const clientIp = getClientIp(req);

  // eslint-disable-next-line no-console
  console.log(clientIp);
  // Check if the limit of requests from one IP has been exceeded, otherwise block the request.
  try {
    await rateLimiter.consume(clientIp);
  } catch (rateLimitError) {
    const retryAfter = Math.ceil((rateLimitError as any).msBeforeNext / 1000);

    res.status(429)
      .json({
        error: `Too many requests`,
        retryAfter,
      });
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
