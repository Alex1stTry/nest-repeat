import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNamesEnum } from './enum/table-names.enum';
import { BaseModel } from './models/base-model';
import { UserEntity } from './user.entity';

@Entity(TableNamesEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends BaseModel {
  @Column('text')
  refreshToken: string;

  @Column()
  user_id: string;

  @Column()
  device_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.tokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
