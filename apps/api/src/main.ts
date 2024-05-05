import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    allowedHeaders: ['Content-Type, Accept, Authorization'],
    origin: configService.get('FRONTEND_URL'),
    credentials: true
  });

  const globalPrefix = configService.get('GLOBAL_PREFIX');
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get<number>('PORT');
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
