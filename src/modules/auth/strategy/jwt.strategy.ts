import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(private configService : ConfigService){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      igonreExpiration : false,
      secretOrKey : configService.get("JWT_KEY")
    })
  }

  // validate after extracing token
  async validate(payload : any) {
    return {
      userId : payload.userId ,
      firstName : payload.firstName,
      lastName : payload.lastName,
      email : payload.email,
      role : payload.role,
    }
  }

}