import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe, Req, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from '../auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiSecurity('JWT-auth')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE ))
  findAll() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  @ApiSecurity('JWT-auth')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  
  @Patch(':id')
  @ApiSecurity('JWT-auth')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiSecurity('JWT-auth')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
