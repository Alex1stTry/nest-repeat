import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { ResPrivateUserDto } from './dto/res/res-private-user.dto';
import { ResPublicUserDto } from './dto/res/res-public-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ResPrivateUserDto> {
    return await this.userService.create(dto);
  }

  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('me')
  async getMe(): Promise<ResPublicUserDto> {
    return await this.userService.findOne(131);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Patch('me')
  async updateMe(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(+id, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete('me')
  async removeMe(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  public async findOne(@Param('id') id: number): Promise<ResPublicUserDto> {
    return await this.userService.findOne(id);
  }
}
