import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNamesEnum } from './enum/table-names.enum';
import { BaseModel } from './models/base-model';

@Entity(TableNamesEnum.TAGS)
export class TagEntity extends BaseModel {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  @JoinTable()
  articles?: ArticleEntity[];
}
