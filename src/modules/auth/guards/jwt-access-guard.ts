import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UsersRepository } from '../../repository/services/users.repository';
import { TokenType } from '../enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UsersRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride('SKIP_AUTH', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verify(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const isTokenInRedis = await this.authCacheService.isAccessExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isTokenInRedis) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: payload.userId });

    request.user = {
      userId: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
    };
    return true;
  }
}
