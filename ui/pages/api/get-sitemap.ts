import { NextApiRequest, NextApiResponse } from 'next';
import { cmsFetch } from '../../services/cms/api/http-client';

// It is needed in order to secretly trigger an strapi endpoint.
export default async function getSitemap(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await cmsFetch<Response>(`/strapi-5-sitemap-plugin/sitemap.xml`, {
      allResponse: true,
    });

    const xmlData = await response!.text();

    if (!xmlData) {
      res.status(404)
        .json({
          error: `Sitemap data is empty`,
        });
      return;
    }

    res.setHeader(`Content-Type`, `application/xml`);

    res.status(200)
      .send(xmlData);
  } catch (error) {
    res.status(500)
      .json({
        error: `Internal server error`,
      });
  }
}
