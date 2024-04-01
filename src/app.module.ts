import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

let envPath: string;
switch (process.env.APP_ENV) {
  case 'dev':
    envPath = 'envs/.local.env';
    break;
  case 'staging':
    envPath = 'envs/.staging.env';
    break;
  case 'prod':
    envPath = 'envs/.prod.env';
    break;
  default:
    envPath = 'envs/.local.env';
}

dotenv.config({ path: path.resolve(envPath) });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}