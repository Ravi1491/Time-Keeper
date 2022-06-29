import { Todo } from "src/modules/todo/entities/todo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  // one user can have multiple todos
  @OneToMany(()=> Todo, (todo)=> todo.user)
  todos : Todo[]; 

}
