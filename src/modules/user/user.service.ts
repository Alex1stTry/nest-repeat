import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(dto: CreateUserDto): Promise<any> {
    return 'This action adds a new user';
  }

  async findAll(): Promise<any> {
    return `This action returns all user`;
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
