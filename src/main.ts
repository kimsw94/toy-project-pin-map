import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerConfig } from './utils/swagger-config'
import { ValidationPipe } from '@nestjs/common'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  SwaggerConfig(app)
  await app.listen(3000)
}

bootstrap()
