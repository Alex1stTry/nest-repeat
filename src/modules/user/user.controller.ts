import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ResPrivateUserDto } from './dto/res/res-private-user.dto';
import { ResPublicUserDto } from './dto/res/res-public-user.dto';
import { UserMapper } from './presenter/user.mapper';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  public async getMe(
    @CurrentUser() userData: IUserData,
  ): Promise<ResPrivateUserDto> {
    const user = await this.userService.getMe(userData);
    return UserMapper.toPrivateDto(user);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
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
