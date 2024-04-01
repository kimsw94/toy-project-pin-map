import { Injectable } from '@nestjs/common';
import { FollowsDTO } from './dtos/follows.dto';
import { FollowsRepository } from './repos/follows.repository';

@Injectable()
export class FollowsService {
    constructor(private readonly followRepository: FollowsRepository) {}

    async createFollow(dto: FollowsDTO) {
      const createFollow = await this.followRepository.createFollow(dto);
      return createFollow;
    }
  
    async deleteFollow(dto: FollowsDTO) {
      const deleteFollow = await this.followRepository.deleteFollow(dto);
      return deleteFollow;
    }
  
    async readFollowLists(dto: FollowsDTO) {
      const readFollowLists = await this.followRepository.readFollowLists(dto);
      return readFollowLists;
    }
    
}
