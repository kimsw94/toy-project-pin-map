import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { PostsDTO } from '../../dtos/posts.dto';
  import { Request, Response } from 'express';
  import { PostsService } from '../../posts.service';
  import { JwtAuthGuard } from 'src/jwt/jwt.guard';
  import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
  import { LikesService } from './likes.service';
  
  @Controller('likes')
  export class LikesController {
    constructor(
      private readonly likesService: LikesService,
      private readonly jwtService: JwtService,
    ) {}
  
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createLike(@Body() dto: PostsDTO) {
      const createLike = await this.likesService.createLike(dto);
      return createLike;
    }

    @Post('delete')
    @UseGuards(JwtAuthGuard)
    async deleteLike(@Body() dto: PostsDTO) {
      const deleteLike = await this.likesService.deleteLike(dto);
      return deleteLike;
    }
  }
  