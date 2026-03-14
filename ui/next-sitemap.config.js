module.exports = {
  siteUrl: `https://tourmalinecore.com`,
  generateRobotsTxt: true,
  exclude: [
    `/components`,
    `/components/*`,
    `/ru/components`,
    `/ru/components/*`,
    `/zh/components`,
    `/zh/components/*`,
    `/404`,
    `/ru/404`,
    `/zh/404`,
  ],
  robotsTxtOptions: {
    policies: [
      process.env.ENABLE_SEO_INDEXING === `true` ? {
        userAgent: `*`,
        disallow: [
          `/components`,
          `/ru/components`,
          `/zh/components`,
        ],
      } : {
        userAgent: `*`,
        disallow: `/`,
      },
    ],
    ...(process.env.ENABLE_SEO_INDEXING === `true` && {
      additionalSitemaps: [`https://tourmalinecore.com/api/get-sitemap`],
    }),
  },
};
