import { Injectable } from '@nestjs/common';
import { EntityRepository , Repository, Connection } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
