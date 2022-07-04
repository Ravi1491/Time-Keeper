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
import { DocumentService } from '../search/documents/document.service';
import { enCodedPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository : UserRepository,
    private eventEmitter : EventEmitter2,
    private mailService: MailerService,
    private documentService: DocumentService,
  ){}

  // Signup user
  async create(createUserDto: CreateUserDto) : Promise<string> {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    const hashPassword = enCodedPassword(createUserDto.password);
    user.password = hashPassword;
    user.role = Constants.ROLES.NORMAL_ROLE;

    await this.userRepository.save(user);
    this.eventEmitter.emit('signup_mail', new UserCreatedEvent(user.firstName,user.email))
    await this.saveDocument(user.email);

    return "User SuccessFully Signup"
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

  // save data in the userList Index of Meiliesearch
  async saveDocument(emails : string){
    const user = await this.userRepository.findOne({where: { email: emails}})
    const { id, firstName, lastName, email, role } = user
    this.documentService.addUserDocument('userList', {id, firstName, lastName, email, role })
  }

  // Find All Users
  findAll() : Promise<User[]> {
    return this.userRepository.find();
  }

  // Find only One User
  findOne(id: number) {
    return this.userRepository.findOneOrFail({where: { id: id }});
  }

  // Find User By Id
  findUserById(id: number) {
    return this.userRepository.findOneOrFail({where: { id: id }});
  }

  // Find User By Email
  findUserByEmail(email:string){
    return this.userRepository.findOne({where: { email: email}})
  }

  // Update User
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

  // Delete User
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
