import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { StandardResponseInterceptor } from './common/interceptors/standard-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable urlencoded body parser for form submissions (like FastAPI OAuth2PasswordRequestForm)
  const express = require('express');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.useGlobalInterceptors(new StandardResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Focus Tracker API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
