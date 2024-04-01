import { EntityManager, Between } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GroupsDTO } from '../dtos/groups.dto';
import { GroupsEntity } from '../entities/groups.entity';
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
export class GroupsRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createGroup(dto: GroupsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(GroupsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('groups').values({}).execute();

    return { result };
  }
  async deleteGroup(dto: GroupsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(GroupsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('groups').values({}).execute();

    return { result };
  }

  async cancelGroup(dto: GroupsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(GroupsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('groups').values({}).execute();

    return { result };
  }

  async applyGroup(dto: GroupsDTO, manager?: EntityManager) {
    let repo = null;
    if (manager) {
      repo = manager.getRepository(GroupsEntity);
      repo = repo.createQueryBuilder();
    } else {
      repo = this.entityManager;
      repo = repo.createQueryBuilder();
    }

    const result = await repo.insert().into('groups').values({}).execute();

    return { result };
  }

}
