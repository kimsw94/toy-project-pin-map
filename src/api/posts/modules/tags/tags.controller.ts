import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { TagsDTO } from './dtos/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createTag(@Body() dto: TagsDTO) {
    const createTag = await this.tagsService.createTag(dto);
    return createTag;
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateTag(@Body() dto: TagsDTO) {
    const updateTag = await this.tagsService.updateTag(dto);
    return updateTag;
  }

  @Post('delete')
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Body() dto: TagsDTO) {
    const deleteTag = await this.tagsService.deleteTag(dto);
    return deleteTag;
  }
}
