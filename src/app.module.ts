import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { RemainderModule } from './modules/reminder/reminder.module';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { SearchModule } from './modules/search/search.module';
import { DocumentModule } from './modules/search/documents/document.module';
import { IndexModule } from './modules/search/indexes/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    DatabaseModule,
    UserModule,
    TodoModule,
    AuthModule,
    RemainderModule,
    SearchModule,
    IndexModule,
    DocumentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
