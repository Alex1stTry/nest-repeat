import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/transform-helper/transform-helper';
import { regexConstants } from '../../../../constants/regex-constants';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Length(2, 20)
  public readonly name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @Transform(TransformHelper.trim)
  @Matches(regexConstants.EMAIL, { message: 'Incorrect email' })
  public readonly email: string;

  @ApiProperty()
  @Matches(regexConstants.PASSWORD, {
    message:
      'at least one letter (either uppercase or lowercase),' +
      'at least one digit, at least one special character from the set @$!%_*#?&,' +
      'at least 8 characters long',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  public readonly password: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @Min(16)
  @Max(60)
  public readonly age: number;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.trim)
  @Matches(regexConstants.PHONE)
  @ApiProperty({ required: false })
  @IsOptional()
  public readonly phone?: string;

  @ApiProperty()
  @IsString()
  @Transform(TransformHelper.trim)
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
