import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { TableNamesEnum } from './enum/table-names.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { BaseModel } from './models/base-model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNamesEnum.USER)
export class UserEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column('int')
  age: number;

  @Column('text', { nullable: true })
  phone: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  image: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  tokens?: RefreshTokenEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.followers)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.followings)
  followings?: FollowEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];
}
