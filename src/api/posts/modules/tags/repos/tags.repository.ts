import { EntityManager } from 'typeorm';
import { TagsEntity } from '../entities/tags.entity';
import { Injectable } from '@nestjs/common';
import { TagsDTO } from '../dtos/tags.dto';

@Injectable()
export class TagsRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createTag(dto: TagsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(TagsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('tags').values({}).execute();
    return { result };
  }

  async deleteTag(dto: TagsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(TagsEntity);
    } else {
      repo = this.entityManager;
    }

    const result = await repo
      .createQueryBuilder()
      .softDelete()
      .from('tags')
      .where('', {})
      .execute();
    return result;
  }

  async updateTag(dto: TagsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(TagsEntity);
    } else {
      repo = this.entityManager;
    }

    const result = await repo
      .createQueryBuilder()
      .softDelete()
      .from('tags')
      .where('', {})
      .execute();
    return result;
  }
}
