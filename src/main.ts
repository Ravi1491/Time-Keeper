import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverMiddleware } from './app.middleware'
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard());
  app.use(serverMiddleware);
  
  const options = new DocumentBuilder()
  .setTitle('Todo App')
  .setDescription('Todo Nest App Api Docs')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT Token',
    in: 'header'
  }, 'JWT-auth').build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
