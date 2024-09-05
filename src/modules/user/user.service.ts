import { Get, Injectable } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserEntity } from '../../database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UsersRepository } from '../repository/services/users.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  async getMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  async findOne(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
