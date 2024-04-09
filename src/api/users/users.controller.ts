import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common'
import { AuthResponseDTO, UserAuthDTO } from './dtos/auth.dto'
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
  ) {}

  @ApiOperation({ summary: '회원가입 엔드포인트'})
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @Post('sign-up')
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
  async signIn(@Body() dto: UserAuthDTO): Promise<AuthResponseDTO> {
    const token: string = await this.usersService.signIn(dto)
    return new AuthResponseDTO(token)
  }
}