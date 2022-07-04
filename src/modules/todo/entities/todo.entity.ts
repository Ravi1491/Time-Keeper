import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  creation_date: string;

  @Column()
  status: string;

  @Column({nullable: true})
  dueDate: string;

  // many todos belong to one user
  @ManyToOne(()=>User, (user) => user.todos)
  user: User;
}
