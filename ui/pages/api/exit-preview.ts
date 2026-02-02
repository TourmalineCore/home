import { NextApiRequest, NextApiResponse } from 'next';

export default async function exit(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData({});

  res.redirect(`/`);
}
