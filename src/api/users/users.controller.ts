import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { UsersDTO } from './dtos/users.dto'
import { AuthResponseDto, UserAuthDTO } from './dtos/auth.dto'
import { Request, Response } from 'express'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/jwt/jwt.guard'
import { JwtService } from '@nestjs/jwt'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  @UseGuards(JwtAuthGuard)
  async signUp(@Body() dto: UserAuthDTO): Promise<AuthResponseDto> {
    const token: string = await this.usersService.signUp(dto)
    return new AuthResponseDto(token)
  }

  @Post('sign-in')
  @UseGuards(JwtAuthGuard)
  async signIn(@Body() dto: UserAuthDTO) {
    const { user, jwt } = await this.usersService.signIn(dto)
    return { success: true, user: user, jwt }
  }

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
