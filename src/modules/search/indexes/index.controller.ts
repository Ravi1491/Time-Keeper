import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodoService } from '../../todo/todo.service';
import { createIndexDto } from './dto/index.dto';
import { IndexService } from './index.service';

@Controller('indexes')
export class IndexController {
  constructor(
    private searchService: IndexService,
  ) {}

  @Post()
  public async createIndex(@Body() createIndexDto: createIndexDto){
    return this.searchService.createIndex(createIndexDto.uid, createIndexDto.primaryKey);
  }

  // @Get('/add')
  // public async getSearch() {
  //   const todos = await this.todoService.findAllTodos() ;
  //   const resp = await this.searchService.addDocuments(todos);
  // }

  @Get(':index_uid')
  public async getOneIndexes(@Param('index_uid') index_uid: string){
    return this.searchService.getOneIndexes(index_uid);
  }
  
  @Get()
  public async getAllIndexes(){
    return this.searchService.getAllIndexes();
  }

  @Put()
  public async updateIndex(@Body() createIndexDto: createIndexDto){
    return this.searchService.updateIndex(createIndexDto.uid, createIndexDto.primaryKey);
  }

  @Delete(':uid')
  public async deleteIndex(@Param('uid') uid: string){
    return this.searchService.deleteIndex(uid);
  }

}