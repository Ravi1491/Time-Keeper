import { Injectable } from '@nestjs/common';
import { EntityRepository , Repository, Connection } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {

  getuserByName(firstName: string){
    return this.findOne({
      where: {  
        firstName: firstName
      }
    })
  }

}

export const UserRepositoryProvider = {
  provide: 'UserRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
  inject: [Connection],
};
