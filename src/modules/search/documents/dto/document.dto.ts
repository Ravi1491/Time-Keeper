import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from "class-validator";


export class UserDocumentDto{

  @IsNumber()
  id: number;

  @IsString()
  firstName : string;

  @IsString()
  lastName : string;

  @IsEmail()
  email : string;
  
  @IsString()
  role : string;
}

export class TodoDocumentDto{
  
  @IsNumber()
  id: number;
  
  @IsString()
  title : string;

  @IsString()
  creation_date: string;
  
  @IsOptional()
  @IsString()
  dueDate : string;

  @IsString()
  status: string;
  
  @IsObject()
  user: object;
}