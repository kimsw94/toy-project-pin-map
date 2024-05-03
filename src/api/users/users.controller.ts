import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common'
import { AuthDTO } from './dtos/auth.dto'
import { UsersDTO } from './dtos/users.dto'
import { UsersService } from './users.service'
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/jwt/jwt.guard'

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

  @ApiOperation({ summary: '회원정보 보기' })
  @ApiResponse({
    status: 201,
    description: '성공',
  })
  @Post('/info/:userId')
  async userInfo(
    @Param() userId: string,
  ): Promise<UsersDTO.UserResponse> {
    const info = await this.usersService.getUserInfo(userId)
    return new UsersDTO.UserResponse(info.id, info.nickname)
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
    const token: string = await this.usersService.signIn(
      dto.email,
      dto.password,
    )
    return new AuthDTO.response(token)
  }
}
