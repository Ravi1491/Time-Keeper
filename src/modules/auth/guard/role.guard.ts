import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class RoleGuard implements CanActivate{

  private role : string;

  constructor(role : string){
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();    
    const request : any = ctx.getRequest<Request>();

    // console.log(request.user);
    // console.log();

    if(this.role == request.user.role )  return true;

    return false;
  }
}