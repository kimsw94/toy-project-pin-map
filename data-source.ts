import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import * as path from 'path'

let envPath = 'envs/.local.env'
dotenv.config({ path: path.resolve(envPath) })

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
})
