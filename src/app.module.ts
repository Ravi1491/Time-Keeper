import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    DatabaseModule,
    UserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
