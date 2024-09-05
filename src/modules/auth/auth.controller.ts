import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  public async register(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.register(dto);
  }

  @SkipAuth()
  @Post('sign-in')
  public async logIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.logIn(dto);
  }
}
