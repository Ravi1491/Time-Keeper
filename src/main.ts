import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverMiddleware } from './app.middleware'
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard());
  app.use(serverMiddleware);
  await app.listen(3000);
}
bootstrap();
