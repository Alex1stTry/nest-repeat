import * as process from 'node:process';

export default () => ({
  app: {
    port: Number(process.env.APP_PORT),
    host: process.env.APP_HOST,
  },
  postgres: {},
});
