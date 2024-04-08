import { JwtPayload } from './jwt.payload'
import { UsersService } from '../api/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { UserAuthDTO } from 'src/api/users/dtos/auth.dto'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromHeaders]),
        secretOrKey: process.env.JWT_KEY || 'default-secret', // 기본 값 설정
        ignoreExpiration: false,
      })
      
  }

  async validate(dto: UserAuthDTO) {
    try {
      const user = await this.usersService.findUserByEmail(dto)
      if (user) {
        return user
      } else {
        throw new Error('해당하는 유저는 없습니다.')
      }
    } catch (error) {
      throw new UnauthorizedException(error)
    }
  }
}
