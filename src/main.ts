import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solo deja pasar las propiedades que esten definidas en el DTO
      forbidNonWhitelisted: true, // la propiedad que no este definida en el DTO la elimina 
    })
  )

  await app.listen(3001);
}
bootstrap();
