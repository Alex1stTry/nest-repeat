import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  id: string;

  name: string;

  email: string;

  password: string;

  age: number;

  phone?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty({ default: false })
  isVerified: boolean;
}
