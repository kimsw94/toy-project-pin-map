import { EntityManager, Between } from 'typeorm';
import { PostsEntity } from '../entities/posts.entity';
import { Injectable } from '@nestjs/common';
import { PostsDTO } from '../dtos/posts.dto';

type UserDataType = {
  id?: number;
  email?: string;
  password?: string;
  nickname?: string;
  phone?: string;
};

type OptionType = {
  with_deleted?: boolean;
};

@Injectable()
export class PostsRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createPost(dto: PostsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(PostsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('events').values({}).execute();

    return { result };
  }
}
