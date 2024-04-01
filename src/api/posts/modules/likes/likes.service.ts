import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../../repos/posts.repository';
import { PostsDTO } from '../../dtos/posts.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {
  constructor(private readonly postRepository: PostsRepository) {}

  async createLike(dto: PostsDTO) {
    const createLike = await this.postRepository.createPost(dto);
    return createLike;
  }

  async deleteLike(dto: PostsDTO) {
    const deleteLike = await this.postRepository.createPost(dto);
    return deleteLike;
  }
}
