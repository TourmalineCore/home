export default ({
  env
}) => ({
  upload: {
    config: {
      provider: `aws-s3`,
      providerOptions: {
        baseUrl: env(`AWS_PUBLIC_ENDPOINT`, `http://localhost:9010/home-bucket-local`),
        s3Options: {
          credentials: {
            accessKeyId: env(`AWS_ACCESS_KEY_ID`, `admin`),
            secretAccessKey: env(`AWS_ACCESS_SECRET_KEY`, `rootPassword`),
          },
          endpoint: env(`AWS_ENDPOINT`, `http://localhost:9010`),
          region: env(`AWS_REGION`, `us-east-1`),
          forcePathStyle: true,
          params: {
            ACL: env(`AWS_ACL`, `public-read`),
            Bucket: env(`AWS_BUCKET`, `home-bucket-local`),
          },
        }
      },
    },
  },
  seo: {
    enabled: true,
  },
  documentation: {
    enabled: true,
    config: {
      openapi: `3.0.0`,
      info: {
        version: `1.0.0`,
        title: `API documentation`,
        description: ``,
      },
      'x-strapi-config': {
        plugins: [],
      },
    },
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: `api::layout.layout`,
          draft: {
            url: `${env(`FRONTEND_URL`)}/api/preview`,
            query: {
              slug: ``,
              secret: env(`PREVIEW_SECRET`)
            },
            openTarget: `StrapiPreviewPage`,
          },
        },
        {
          uid: `api::homepage.homepage`,
          draft: {
            url: `${env(`FRONTEND_URL`)}/api/preview`,
            query: {
              slug: ``,
              secret: env(`PREVIEW_SECRET`)
            },
            openTarget: `StrapiPreviewPage`,
          },
        },
        {
          uid: `api::navigation.navigation`,
          draft: {
            url: `${env(`FRONTEND_URL`)}/api/preview`,
            query: {
              slug: `{link}`,
              secret: env(`PREVIEW_SECRET`)
            },
            openTarget: `StrapiPreviewPage`,
          },
        },
      ]
    }
  },
  'strapi-cache': {
    enabled: true,
    config: {
      debug: false, // Enable debug logs
      max: 1000, // Maximum number of items in the cache (only for memory cache)
      ttl: 1000 * 60, // Time to live for cache items (1 hour)
      size: 1024 * 1024 * 1024, // Maximum size of the cache (1 GB) (only for memory cache)
      allowStale: false, // Allow stale cache items (only for memory cache)
      cacheableRoutes: [], // Caches routes which start with these paths (if empty array, all '/api' routes are cached)
      provider: `memory`, // Cache provider ('memory' or 'redis')
      cacheHeaders: true, // Plugin also stores response headers in the cache (set to false if you don't want to cache headers)
      cacheAuthorizedRequests: false, // Cache requests with authorization headers (set to true if you want to cache authorized requests)
    },
  },
}); 
