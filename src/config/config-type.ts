export type ConfigType = {
  app: AppConfig;
  pg: PostgresConfig;
  redis: RedisConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  host: string;
  port: number;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
