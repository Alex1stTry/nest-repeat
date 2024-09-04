import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigType, JWTConfig } from '../../../config/config-type';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;
  constructor(
    private readonly configService: ConfigService<ConfigType>,
    private readonly redisService: RedisService,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }
  public async saveAccess(
    token: string,
    deviceId: string,
    userId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${deviceId}:${userId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.refreshExpireIn);
  }
}
