import { IsEmpty, IsNotEmpty, IsString, Length } from "class-validator";


export class createIndexDto{

  @IsNotEmpty()
  uid: string;

  @IsString()
  primaryKey: string;
}