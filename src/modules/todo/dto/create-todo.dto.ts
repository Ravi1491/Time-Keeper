import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTodoDto {

  @ApiProperty()
  @IsString()
  title : string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  due_date : string;

}
