import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Shop Api Example')
    .setDescription('The shop API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        name: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'Header',
      },
      'AccessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
