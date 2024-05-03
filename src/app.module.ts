import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './api/users/users.module'
import { UserEntity, UserGroupEntity } from './entities/user.entity'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GroupEntity } from './entities/group.entity'
import { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

let envPath: string

switch (process.env.APP_ENV) {
  case 'dev':
    envPath = 'envs/.local.env'
    break
  case 'staging':
    envPath = 'envs/.staging.env'
    break
  case 'prod':
    envPath = 'envs/.prod.env'
    break
  default:
    envPath = 'envs/.local.env'
}

dotenv.config({ path: path.resolve(envPath) })
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, UserGroupEntity, GroupEntity],
      synchronize: false,
      migrationsRun: false, // 서버 구동 시 작성된 마이그레이션 파일을 기반으로 마이그레이션을 수행하게 할지 설정하는 옵션. false로 설정하여 직접 CLI로 마이그레이션 수행
      migrations: [__dirname + '/**/migrations/*.ts}'], // 마이그레이션을 수행할 파일이 관리되는 경로 설정
      migrationsTableName: 'migrations', // 마이그레이션 이력이 기록되는 테이블 이름 설정
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
