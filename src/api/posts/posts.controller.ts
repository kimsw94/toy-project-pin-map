import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { PostsDTO } from './dtos/posts.dto';
  import { Request, Response } from 'express';
  import { PostsService } from './posts.service';
  import { JwtAuthGuard } from 'src/jwt/jwt.guard';
  import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
  
  @Controller('posts')
  export class UsersController {
    constructor(
      private readonly postsService: PostsService,
      private readonly jwtService: JwtService,
    ) {}
  
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() dto: PostsDTO) {
      const createPost = await this.postsService.createPost(dto);
      return createPost;
    }
  }
  