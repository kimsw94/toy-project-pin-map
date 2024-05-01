import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { ConfigService } from '@nestjs/config'
import { UsersController } from './users.controller'
import { UsersRepository } from 'src/repositories/users.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/user.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'src/jwt/jwt.strategy'

@Module({
  providers: [
    UsersService,
    UsersRepository,
    JwtStrategy // 콤마 제거
  ],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '15s' },
      }),
    }),
  ],
})

export class UsersModule {}
