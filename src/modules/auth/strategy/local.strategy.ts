import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/user.service";
import { comparePassword } from "src/utils/bcrypt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

  constructor(private userService : UserService){
    super({
      usernameField : 'email',
      passwordField : 'password' 
    })
  }

  // Validate Login Credentials
  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);

    if(user == undefined )  throw new UnauthorizedException("User Not Found - " + email);
    
    const matched = comparePassword(password, user.password)

    if(matched) return user;
    else  throw new UnauthorizedException("Invalid Credentials");
    
  }

}