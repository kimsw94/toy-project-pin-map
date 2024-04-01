import { Injectable } from '@nestjs/common';
import { TagsDTO } from './dtos/tags.dto';
import { TagsRepository } from './repos/tags.repository';

@Injectable()
export class TagsService {
    constructor(private readonly tagRepository: TagsRepository) {}

    async createTag(dto: TagsDTO) {
      const createTag = await this.tagRepository.createTag(dto);
      return createTag;
    }
  
    async deleteTag(dto: TagsDTO) {
      const deleteTag = await this.tagRepository.deleteTag(dto);
      return deleteTag;
    }
  
    async updateTag(dto: TagsDTO) {
      const updateTag = await this.tagRepository.updateTag(dto);
      return updateTag;
    }
}
