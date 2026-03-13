import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const {
    slug = ``,
  } = req.query;

  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401)
      .json({
        message: `Invalid token`,
      });
  }

  res.setPreviewData({ });

  res.redirect(`${slug}`.startsWith(`/`) ? `${slug}` : `/${slug}`);
}
