import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { LikesModule } from './modules/likes/likes.module';
import { TagsModule } from './modules/tags/tags.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [LikesModule, TagsModule]
})
export class PostsModule {}
