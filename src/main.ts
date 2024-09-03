import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const expressApp = express();

  // Set the 'trust proxy' setting
  expressApp.set('trust proxy', 1);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(3003);
}
bootstrap();
