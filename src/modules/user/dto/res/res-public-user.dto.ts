import { PickType } from '@nestjs/swagger';
import { BaseUserDto } from '../req/base-user.dto';

export class ResPublicUserDto extends PickType(BaseUserDto, [
  'name',
  'phone',
  'age',
]) {}
