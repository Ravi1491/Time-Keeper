import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

  constructor(private userService : UserService){
    super({
      usernameField : 'email',
      passwordField : 'password' 
    })
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);
    if(user && user.password === password) return user;
    if(user == undefined )  throw new UnauthorizedException("User Not Found - " + email);
    if(user.password !== password) throw new UnauthorizedException("Invalid Credentials");
  }

}