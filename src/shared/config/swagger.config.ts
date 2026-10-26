import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Buildora API')
  .setDescription('Buildora API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
