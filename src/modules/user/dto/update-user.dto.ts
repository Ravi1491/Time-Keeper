import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty()
  @IsString()
  firstName : string;

  @ApiProperty()
  @IsString()
  lastName : string;

  @ApiProperty()
  @IsEmail()
  email : string;
  
  @ApiProperty()
  @IsString()
  password : string;

}
