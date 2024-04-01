import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { GroupsService } from './groups.service';
import { GroupsDTO } from './dtos/groups.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createGroup(@Body() dto: GroupsDTO) {
    const createGroup = await this.groupService.createGroup(dto);
    return createGroup;
  }
  async applyGroup(@Body() dto: GroupsDTO) {
    const applyGroup = await this.groupService.applyGroup(dto);
    return applyGroup;
  }
  async cancelGroup(@Body() dto: GroupsDTO) {
    const cancelGroup = await this.groupService.cancelGroup(dto);
    return cancelGroup;
  }
  async deleteGroup(@Body() dto: GroupsDTO) {
    const deleteGroup = await this.groupService.deleteGroup(dto);
    return deleteGroup;
  }
}
