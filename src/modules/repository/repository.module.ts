import { Global, Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';
import { ArticleRepository } from './services/articles.repository';
import { CommentsRepository } from './services/comments.repository';
import { FollowRepository } from './services/follow.repository';
import { LikesRepository } from './services/likes.repository';
import { RefreshTokensRepository } from './services/refresh-tokens.repository';
import { TagsRepository } from './services/tags.repository';
import { UsersRepository } from './services/users.repository';

const repositories = [
  ArticleRepository,
  FollowRepository,
  UsersRepository,
  LikesRepository,
  RefreshTokensRepository,
  TagsRepository,
  CommentsRepository,
  RedisModule,
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
