import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Param('userId') userId : number) {
    return this.todoService.create(createTodoDto, userId);
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId', ParseIntPipe) userId : number) {
    return this.todoService.findAllTodosByUserNotCompleted(userId);
  }

  @Get('/findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId', ParseIntPipe) userId : number) {
    return this.todoService.findAllTodosByUserCompleted(userId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.update(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }
}
