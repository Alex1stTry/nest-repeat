import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  age: number;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ default: false })
  isVerified: boolean;
}
