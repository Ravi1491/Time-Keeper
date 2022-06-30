import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {

  constructor(private JwtService : JwtService){}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): any {
    const user : User = req.user;

    const payload = {
      userId : user.id,
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      role : user.role,
    }

    return { 
      message : `${user.firstName} login successfully`, 
      token : this.JwtService.sign(payload) 
    } ;
  }

}
