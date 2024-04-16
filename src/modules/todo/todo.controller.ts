import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiTags('Todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Create Todos
  @Post(':userId')
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Param('userId') userId : number) {
    return this.todoService.create(createTodoDto, userId);
  }

  // Find Not Completeed Todos by User
  @Get('/findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId', ParseIntPipe) userId : number) {
    console.log('123 ----- ', process.env.SENDER_EMAIL)
    return this.todoService.findAllTodosByUserNotCompleted(userId);
  }

  // Find Completeed Todos by User
  @Get('/findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId', ParseIntPipe) userId : number) {
    return this.todoService.findAllTodosByUserCompleted(userId);
  }

  // Update todos to done 
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.update(id);
  }

  // Delete Todos
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }

  // to check efficiency of a user
  @Get('/performance/:userId')
  performance(@Param('userId', ParseIntPipe) userId: number){
    return this.todoService.performance(userId);
  }
}
