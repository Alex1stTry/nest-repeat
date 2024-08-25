import { Column, Entity } from 'typeorm';

import { BaseModel } from './models/base-model';

@Entity('users')
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column('int')
  age: number;

  @Column('text', { nullable: true })
  phone: string;

  @Column('boolean', { default: false })
  isVerified: boolean;
}
