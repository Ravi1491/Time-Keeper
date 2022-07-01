import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repo/user.repository';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '@nestjs-modules/mailer';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository : UserRepository,
    private eventEmitter : EventEmitter2,
    private mailService: MailerService,
  ){}

  // Signup user
  create(createUserDto: CreateUserDto) : Promise<User> {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;

    this.eventEmitter.emit('signup_mail', new UserCreatedEvent(user.firstName,user.email))

    return this.userRepository.save(user);
  }

  @OnEvent('signup_mail')
  sendEmail(payload : UserCreatedEvent ){
    this.mailService.sendMail({
      from: 'todo@gmail.com',
      to: payload.email,
      subject: "Todo Application",
      text: `${payload.firstName} - Succesfully Signup`
    });
  }

  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail({where: { id: id }});
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail({where: { id: id }});
  }

  findUserByEmail(email:string){
    return this.userRepository.findOne({where: { email: email}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.email = updateUserDto.email;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.password = updateUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
