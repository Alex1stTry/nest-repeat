import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { ConfigType, RedisConfig } from '../../config/config-type';
import { REDIS_CLIENT } from './redis.const';
import { RedisService } from './redis.service';

const redisProvider: Provider = {
  useFactory: (configService: ConfigService<ConfigType>): Redis => {
    const redisConfig = configService.get<RedisConfig>('redis');

    return new Redis({
      port: redisConfig.port,
      host: redisConfig.host,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
  provide: REDIS_CLIENT,
};

@Module({
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
