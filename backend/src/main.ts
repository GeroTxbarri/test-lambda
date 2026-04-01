import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' }); // Habilita CORS para permitir llamadas desde el frontend de Nextjs
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
