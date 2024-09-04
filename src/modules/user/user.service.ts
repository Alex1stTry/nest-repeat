import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UserService {
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
