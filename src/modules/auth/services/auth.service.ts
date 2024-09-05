import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { UsersRepository } from '../../repository/services/users.repository';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async register(dto: SignUpReqDto): Promise<AuthResDto> {
    await this.isEmailExist(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshTokensRepository.save({
        refreshToken: tokens.refreshToken,
        user_id: user.id,
        device_id: dto.deviceId,
      }),
      this.authCacheService.saveAccess(
        tokens.accessToken,
        dto.deviceId,
        user.id,
      ),
    ]);

    return { user, tokens };
  }
  public async logIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPassValid = bcrypt.compare(dto.password, user.password);
    if (!isPassValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshTokensRepository.delete({
        device_id: dto.deviceId,
        user_id: user.id,
      }),
      this.authCacheService.deleteAccess(dto.deviceId, user.id),
    ]);

    await Promise.all([
      this.refreshTokensRepository.save({
        refreshToken: tokens.refreshToken,
        user_id: user.id,
        device_id: dto.deviceId,
      }),
      this.authCacheService.saveAccess(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    return { user, tokens };
  }

  private async isEmailExist(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('email already exist');
    }
  }
}
