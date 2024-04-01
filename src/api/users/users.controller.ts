import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    UseGuards,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { UsersDTO } from './dtos/users.dto';
  import { Request, Response } from 'express';
  import { UsersService } from './users.service';
  import { JwtAuthGuard } from 'src/jwt/jwt.guard';
  import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
    @Post('sign-up')
    async signUp(@Body() dto: UsersDTO) {
      const signUp = await this.usersService.signUp(dto);
      return signUp;
    }
  
    @Post('sign-in')
    @UseGuards(JwtAuthGuard)
    async signIn(
      @Body() dto: UsersDTO,
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response,
    ) {
      const { user, jwt } = await this.usersService.signIn(dto);
      res.cookie('jwt', jwt, { httpOnly: false });
  
      return { success: true, user: user, jwt };
    }
  
    @Post('withdraw')
    @UseGuards(JwtAuthGuard)
    async userWithdraw(
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response,
    ) {
      const jwtCookie = req.cookies[process.env.JWT_KEY];
      const userId = this.jwtService.decode(jwtCookie)['id'];
      const withdraw = await this.usersService.withdraw(userId);
  
      return { success: true, withdraw };
    }
  }
  