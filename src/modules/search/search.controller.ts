import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { TodoService } from '../todo/todo.service';
import { SearchService } from './search.service';

@Controller('indexes/:index_uid/search')
export class SearchController {
  constructor(
    private searchService: SearchService,
  ) {}

  // @Post()
  // public async createIndex(@Body() createIndexDto: createIndexDto){
  //   return this.searchService.createIndex(createIndexDto.uid, createIndexDto.primaryKey);
  // }

  // @Get('/add')
  // public async getSearch() {
  //   const todos = await this.todoService.findAllTodos() ;
  //   const resp = await this.searchService.addDocuments(todos);
  // }
  
  @Get()
  public async getsearch(@Param('index_uid') index_uid: string, @Query('query') query: any) {
    return await this.searchService.getsearch(index_uid, query);
  }

  @Post()
  public async getSearch(@Param('index_uid') index_uid: string, @Query('query') query: any){
    return await this.searchService.getsearch(index_uid, query);
  }

  // @Get(':index_uid')
  // public async getOneIndexes(@Param('index_uid') index_uid: string){
  //   return this.searchService.getOneIndexes(index_uid);
  // }

  // @Put()
  // public async updateIndex(@Body() createIndexDto: createIndexDto){
  //   return this.searchService.updateIndex(createIndexDto.uid, createIndexDto.primaryKey);
  // }

  // @Delete(':uid')
  // public async deleteIndex(@Param('uid') uid: string){
  //   return this.searchService.deleteIndex(uid);
  // }


  // @Post(':userId')
  // public async searchMovie(@Param('userId', ParseIntPipe)  userId: number, @Body() search: SearchMovieDto) {
  //   return await this.searchService.search(search.text, {
  //     attributesToRetrieve: ['title', 'status', 'due_date', 'user.firstName'],
  //     attributesToHighlight: ['title'],
  //   });
  // }
}