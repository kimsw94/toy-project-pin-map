import { Injectable } from '@nestjs/common';
import { PostsRepository } from './repos/posts.repository';
import { PostsDTO } from './dtos/posts.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async createPost(dto: PostsDTO) {
    const createPost = await this.postRepository.createPost(dto);
    return createPost;
  }

  async listPosts(dto: PostsDTO) {
    const listPosts = await this.postRepository.createPost(dto);
    return listPosts;
  }

  async readPost(dto: PostsDTO) {
    const readPost = await this.postRepository.createPost(dto);
    return readPost;
  }
}
