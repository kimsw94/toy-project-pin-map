import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { PostsService } from '../../posts.service';
  import { JwtAuthGuard } from 'src/jwt/jwt.guard';
  import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
  import { LikesService } from './likes.service';
  import { LikesDTO } from './dtos/likes.dto';
  
  @Controller('likes')
  export class LikesController {
    constructor(
      private readonly likesService: LikesService,
      private readonly jwtService: JwtService,
    ) {}
  
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createLike(@Body() dto: LikesDTO) {
      const createLike = await this.likesService.createLike(dto);
      return createLike;
    }

    @Post('delete')
    @UseGuards(JwtAuthGuard)
    async deleteLike(@Body() dto: LikesDTO) {
      const deleteLike = await this.likesService.deleteLike(dto);
      return deleteLike;
    }
  }
  