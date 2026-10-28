module.exports = {
  siteUrl: `https://tourmalinecore.com`,
  generateRobotsTxt: true,
  exclude: [
    `/**/components`,
    `/**/components/**`,
    `/**/404`,
    `/**/500`,
    `/**/zoo-map-survey`,
  ],
  robotsTxtOptions: {
    policies: [
      process.env.ENABLE_SEO_INDEXING === `true` ? {
        userAgent: `*`,
        disallow: [
          `/components`,
          `/*/components`,
          `/zoo-map-survey`,
          `/*/zoo-map-survey`,
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
