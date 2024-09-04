import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateUserDto } from '../../../user/dto/req/create-user.dto';

export class BaseAuthDto extends PickType(CreateUserDto, [
  'name',
  'age',
  'bio',
  'image',
  'password',
  'email',
  'phone',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
