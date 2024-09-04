import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResPublicUserDto } from './dto/res/res-public-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
