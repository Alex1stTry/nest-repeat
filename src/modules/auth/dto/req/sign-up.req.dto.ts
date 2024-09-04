import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from './base-auth.dto';

export class SignUpReqDto extends PickType(BaseAuthDto, [
  'name',
  'age',
  'deviceId',
  'bio',
  'password',
  'email',
  'image',
  'phone',
]) {}
