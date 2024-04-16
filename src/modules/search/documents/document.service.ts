import { Injectable } from '@nestjs/common';
import MeiliSearch, { Index } from 'meilisearch';
import { TodoDocumentDto, UserDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentService {
  private _client: MeiliSearch;

  constructor() {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700/',
    });
  }
  
  public getIndex(index_uid: string): Index {
    return this._client.index(index_uid);
  }

  public async getDocuments(index_uid: string, document_id: number){
    const index = this.getIndex(index_uid);
    return await index.getDocument(document_id);
  }

  public async getAllDocuments(index_uid: string){
    const index = this.getIndex(index_uid);
    return await index.getDocuments();
  }

  public async addUserDocument(index_uid: string, userDocumentDto: UserDocumentDto){
    const index = this.getIndex(index_uid);
    return await index.addDocuments([userDocumentDto]);  
  }

  public async updateUserDocument(index_uid: string, userDocumentDto: UserDocumentDto){
    const index = this.getIndex(index_uid);
    return await index.updateDocuments([userDocumentDto]);  
  }
  
  public async addTodoDocument(index_uid: string, todoDocumentDto: TodoDocumentDto){
    const index = this.getIndex(index_uid);
    const docu = await index.getDocuments();
    console.log("DOCUMENT------", docu);
    const news = await index.addDocuments([todoDocumentDto]);  
    console.log(news)
    return docu;
  }

  public async updateTodoDocument(index_uid: string, todoDocumentDto: TodoDocumentDto){
    const index = this.getIndex(index_uid);
    return await index.updateDocuments([todoDocumentDto]);  
  }

  public async deleteOneDocument(index_uid: string, document_id: number){
    const index = this.getIndex(index_uid);
    return await index.deleteDocument(document_id);  
  }
  
  public async deleteAllDocument(index_uid: string){
    const index = this.getIndex(index_uid);
    return await index.deleteAllDocuments();  
  }
  
}