import { PickType } from '@nestjs/swagger';
import { BaseUserDto } from '../req/base-user.dto';

export class ResPrivateUserDto extends PickType(BaseUserDto, [
  'name',
  'email',
  'age',
  'phone',
]) {}
