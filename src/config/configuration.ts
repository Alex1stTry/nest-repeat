import * as process from 'node:process';

import { ConfigType } from './config-type';

export default (): ConfigType => ({
  app: {
    port: Number(process.env.APP_PORT),
    host: process.env.APP_HOST,
  },
  pg: {
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENV,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    accessExpireIn: Number(process.env.ACCESS_EXPIRE_IN),
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpireIn: Number(process.env.REFRESH_EXPIRE_IN),
  },
});
