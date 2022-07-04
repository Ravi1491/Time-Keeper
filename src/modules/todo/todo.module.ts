import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserModule } from 'src/modules/user/user.module';
import { DocumentModule } from '../search/documents/document.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule, DocumentModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule {}
