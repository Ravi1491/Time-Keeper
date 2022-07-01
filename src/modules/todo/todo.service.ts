import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repo/todo.repository';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo) private readonly todoRepository: TodoRepository,
    private userService: UserService,
  ) {}

  // Add Todos
  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.creation_date = new Date().toLocaleString();

    if(todo.due_date){
      todo.due_date = createTodoDto.due_date.toLocaleString();
    }else{
      todo.due_date = null;
    }
    
    todo.status = 'pending';
    todo.user = await this.userService.findUserById(userId);

    return this.todoRepository.save(todo);
  }

  // For Reminder Service find all Not completed todos 
  async findPendingTodos(){
    return await this.todoRepository.find({
      relations: ['user'],
      where: {
        status: 'pending',
      },
    });
  }

  // find Not completed todos of user
  findAllTodosByUserNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
        status: 'pending',
      },
    });
  }

    // find completed todos of user
  findAllTodosByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: {
        user: { id: userId },
        status: 'done',
      },
    });
  }

  // to check efficiency of a user
  async performance(userId: number){
    let done = await this.findAllTodosByUserCompleted(userId);
    let pending = await this.findAllTodosByUserNotCompleted(userId);
    
    const CompletedCount = done.reduce((counter, obj) => {
      if (obj.status === 'done') counter += 1
      return counter;
    }, 0);

    const NotCompletedCount = pending.reduce((counter, obj) => {
      if (obj.status === 'pending') counter += 1
      return counter;
    }, 0);

    let efficiency = "0%" ;
    let performance = CompletedCount/(CompletedCount + NotCompletedCount);
    if(!isNaN(performance)) efficiency = performance.toFixed(2) + "%"

    return {
      Compelted_Todos: {CompletedCount, done},
      NotCompleted_Todos: {NotCompletedCount, pending},
      Total_todos: CompletedCount + NotCompletedCount,
      Efficiency: efficiency
    }
  }

    // update todos to done
  update(todoId: number) {
    return this.todoRepository.update(todoId, {status : 'done'});
  }

  // For Reminder Service update todos to overdue
  overDue(todoId: number) {
    return this.todoRepository.update(todoId, {status : 'overDue'});
  }

  //  deleter todos
  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
