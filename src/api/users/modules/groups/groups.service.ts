import { Injectable } from '@nestjs/common';
import { GroupsDTO } from './dtos/groups.dto';
import { GroupsRepository } from './repos/groups.repository';

@Injectable()
export class GroupsService {
    constructor(private readonly groupRepository: GroupsRepository) {}

    async createGroup(dto: GroupsDTO) {
      const createGroup = await this.groupRepository.createGroup(dto);
      return createGroup;
    }
  
    async deleteGroup(dto: GroupsDTO) {
      const deleteGroup = await this.groupRepository.deleteGroup(dto);
      return deleteGroup;
    }
  
    async applyGroup(dto: GroupsDTO) {
      const applyGroup = await this.groupRepository.applyGroup(dto);
      return applyGroup;
    }

    async cancelGroup(dto: GroupsDTO) {
        const cancelGroup = await this.groupRepository.cancelGroup(dto);
        return cancelGroup
    }
}
