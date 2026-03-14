export default ({
  env
}) => ({
  auth: {
    secret: env(`ADMIN_JWT_SECRET`),
  },
  apiToken: {
    salt: env(`API_TOKEN_SALT`),
  },
  transfer: {
    token: {
      salt: env(`TRANSFER_TOKEN_SALT`),
    },
  },
  secrets: {
    encryptionKey: env(`ENCRYPTION_KEY`),
  },
  flags: {
    nps: env.bool(`FLAG_NPS`, true),
    promoteEE: env.bool(`FLAG_PROMOTE_EE`, true),
  },
  // https://docs.strapi.io/cms/configurations/admin-panel#rate-limiting
  rateLimit: {
    // Number of authorization requests
    max: 10,
  },
  watchIgnoreFiles: [
    `../playwright-report/**`,
    `**/playwright-report/**`,
    `**/playwright-tests/**`,
    `**/guidelines/**`
  ]
});
