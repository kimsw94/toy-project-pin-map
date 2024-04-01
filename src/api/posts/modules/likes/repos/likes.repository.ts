import { EntityManager } from 'typeorm';
import { LikesEntity } from '../entities/likes.entity';
import { Injectable } from '@nestjs/common';
import { LikesDTO } from '../dtos/likes.dto';

@Injectable()
export class LikesRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createLike(dto: LikesDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(LikesEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('likes').values({}).execute();
    return { result };
  }

  async deleteLike(dto: LikesDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(LikesEntity);
    } else {
      repo = this.entityManager;
    }

    const result = await repo
      .createQueryBuilder()
      .softDelete()
      .from('likes')
      .where('', {})
      .execute();
    return result;
  }
}
