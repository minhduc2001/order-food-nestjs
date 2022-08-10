import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Order Food')
    .setDescription('The Food API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
