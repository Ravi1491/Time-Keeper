import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TodoService } from '../../todo/todo.service';
import { DocumentService } from './document.service';
import { TodoDocumentDto, UserDocumentDto } from './dto/document.dto';

@Controller('indexes/:index_uid/documents')
export class DocumentController {
  constructor(
    private documentService: DocumentService,
  ) {}

  @Get(':document_id')
  public async getDocuments(@Param('index_uid') index_uid: string, @Param('document_id') document_id: number){
    return this.documentService.getDocuments(index_uid, document_id); 
  }

  @Get()
  public async getAllDocuments(@Param('index_uid') index_uid: string){
    return this.documentService.getAllDocuments(index_uid);
  }

  @Post('/createUser')
  public async addUserDocument(@Param('index_uid') index_uid: string, @Body() userDocumentDto: UserDocumentDto){
    return this.documentService.addUserDocument(index_uid, userDocumentDto);
  }
  
  @Put('/updateUser')
  public async updateUserDocument(@Param('index_uid') index_uid: string, @Body() userDocumentDto: UserDocumentDto){
    return this.documentService.updateUserDocument(index_uid, userDocumentDto);
  }
  
  @Post('/createTodo')
  public async addTodoDocument(@Param('index_uid') index_uid: string, @Body() todoDocumentDto: TodoDocumentDto){
    return this.documentService.addTodoDocument(index_uid, todoDocumentDto);
  }

  @Put('/updateTodo')
  public async updateTodoDocument(@Param('index_uid') index_uid: string, @Body() todoDocumentDto: TodoDocumentDto){
    return this.documentService.updateTodoDocument(index_uid, todoDocumentDto);
  }

  @Delete(':document_id')
  public async deleteOneDocument(@Param('index_uid') index_uid: string,@Param('document_id') document_id: number){
    return this.documentService.deleteOneDocument(index_uid, document_id);
  }

  @Delete()
  public async deleteAllDocument(@Param('index_uid') index_uid: string){
    return this.documentService.deleteAllDocument(index_uid);
  }
  
}