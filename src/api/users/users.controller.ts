import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthResponseDTO, UserAuthDTO } from './dtos/auth.dto'
import { Request, Response } from 'express'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/jwt/jwt.guard'
import { JwtService } from '@nestjs/jwt'
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserSignUpDTO } from './dtos/auth.dto'

@ApiTags('사용자 회원가입 및 로그인')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: '회원가입 엔드포인트'})
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @Post('sign-up')
  @UseGuards(JwtAuthGuard)
  async signUp(@Body() dto: UserSignUpDTO): Promise<AuthResponseDTO> {
    const token: string = await this.usersService.signUp(dto)
    return new AuthResponseDTO(token)
  }

  @ApiOperation({ summary: '로그인 엔드포인트'})
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  
  @Post('sign-in')
  @UseGuards(JwtAuthGuard)
  async signIn(@Body() dto: UserAuthDTO): Promise<AuthResponseDTO> {
    const token: string = await this.usersService.signIn(dto)
    return new AuthResponseDTO(token)
  }


  @ApiOperation({ summary: '회원탈퇴 엔드포인트'})
  @Post('withdraw')
  @UseGuards(JwtAuthGuard)
  async userWithdraw(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwtCookie = req.cookies[process.env.JWT_KEY]
    const userId = this.jwtService.decode(jwtCookie)['id']
    const withdraw = await this.usersService.withdraw(userId)

    return { success: true, withdraw }
  }
}
