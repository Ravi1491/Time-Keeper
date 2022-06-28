import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverMiddleware } from './app.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(serverMiddleware)
  await app.listen(3000);
}
bootstrap();
