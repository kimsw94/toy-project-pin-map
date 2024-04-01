import { EntityManager, Between } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FollowsEntity } from '../entities/follows.entity';
import { FollowsDTO } from '../dtos/follows.dto';

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
export class FollowsRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createFollow(dto: FollowsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(FollowsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('follows').values({}).execute();

    return { result };
  }
  async deleteFollow(dto: FollowsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(FollowsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('follows').values({}).execute();

    return { result };
  }

  async readFollowLists(dto: FollowsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(FollowsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('follows').values({}).execute();

    return { result };
  }

}
