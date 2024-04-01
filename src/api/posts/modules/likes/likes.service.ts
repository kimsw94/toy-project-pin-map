import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repos/posts.repository';
import { LikesDTO } from './dtos/likes.dto';
import { LikesRepository } from './repos/likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likeRepository: LikesRepository) {}

  async createLike(dto: LikesDTO) {
    const createLike = await this.likeRepository.createLike(dto);
    return createLike;
  }

  async deleteLike(dto: LikesDTO) {
    const deleteLike = await this.likeRepository.deleteLike(dto);
    return deleteLike;
  }
}
