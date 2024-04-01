import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GroupsModule } from './modules/groups/groups.module';
import { FollowsModule } from './modules/follows/follows.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [GroupsModule, FollowsModule]
})
export class UsersModule {}
