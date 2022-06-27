import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repo/todo.repository';

@Injectable()
export class TodoService {
  // constructor(private todoRepository : TodoRepository){}
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: TodoRepository,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  findAllTodosByUserNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
        completed: false,
      },
    });
  }

  findAllTodosByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
        completed: true,
      },
    });
  }

  update(todoId: number) {
    return this.todoRepository.update(todoId, {completed : true});
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
