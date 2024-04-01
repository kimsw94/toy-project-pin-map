import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { FollowsService } from './follows.service';
import { FollowsDTO } from './dtos/follows.dto';

@Controller('follows')
export class FollowsController {
    constructor(
        private readonly followsService: FollowsService,
      ) {}
    
      @Post('create')
      @UseGuards(JwtAuthGuard)
      async createFollow(@Body() dto: FollowsDTO) {
        const createFollow = await this.followsService.createFollow(dto);
        return createFollow;
      }
      async deleteFollow(@Body() dto: FollowsDTO) {
        const deleteFollow = await this.followsService.deleteFollow(dto);
        return deleteFollow;
      }
      async readFollowLists(@Body() dto: FollowsDTO) {
        const readFollowLists = await this.followsService.readFollowLists(dto);
        return readFollowLists;
      }

}
