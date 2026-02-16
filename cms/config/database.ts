export default ({
  env
}) => ({
  connection: {
    client: `postgres`,
    connection: {
      host: env(`DATABASE_HOST`, `localhost`),
      port: env.int(`DATABASE_PORT`, 6433),
      database: env(`DATABASE_NAME`, `home_db`),
      user: env(`DATABASE_USERNAME`, `postgres`),
      password: env(`DATABASE_PASSWORD`, `admin`),
      schema: env(`DATABASE_SCHEMA`, `public`), // Not required
    },
    debug: false,
  },
})  