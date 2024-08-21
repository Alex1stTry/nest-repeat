import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { ResPrivateUserDto } from './dto/res/res-private-user.dto';
import { ResPublicUserDto } from './dto/res/res-public-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ResPrivateUserDto> {
    return await this.userService.create(dto);
  }

  @ApiBearerAuth()
  @Get('me')
  async getMe(): Promise<ResPublicUserDto> {
    return await this.userService.findOne(131);
  }

  @ApiBearerAuth()
  @Patch('me')
  async updateMe(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Delete('me')
  async removeMe(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<ResPublicUserDto> {
    return await this.userService.findOne(id);
  }
}
