import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AuthDTO } from './dtos/auth.dto'
import { UsersService } from './users.service'
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('사용자 회원가입 및 로그인')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입 엔드포인트' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @Post('sign-up')
  async signUp(
    @Body() dto: AuthDTO.signUp,
  ): Promise<AuthDTO.response> {
    const token: string = await this.usersService.signUp(dto)
    return new AuthDTO.response(token)
  }

  @ApiOperation({ summary: '로그인 엔드포인트' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @Post('sign-in')
  async signIn(
    @Body() dto: AuthDTO.signIn,
  ): Promise<AuthDTO.response> {
    const token: string =
      await this.usersService.signIn(dto.email, dto.password)
    return new AuthDTO.response(token)
  }
}
