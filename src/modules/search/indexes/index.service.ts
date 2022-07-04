import { Injectable } from '@nestjs/common';
import MeiliSearch, { Index, SearchParams } from 'meilisearch';

@Injectable()
export class IndexService {
  private _client: MeiliSearch;

  constructor() {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700/',
    });
  }

  public getIndex(index_uid: string): Index {
    return this._client.index(index_uid);
  }

  // public async addDocuments(documents) {
  //   const index = this.getIndex();
  //   return await index.addDocuments(documents);
  // }

  public async createIndex(uid: string, PrimaryKey: string){
    return await this._client.createIndex(uid, { primaryKey: PrimaryKey });
  }

  public async updateIndex(uid: string, PrimaryKey: string){
    return await this._client.updateIndex(uid, { primaryKey: PrimaryKey });
  }

  public async deleteIndex(uid: string){
    return this._client.deleteIndex(uid);
  }

  // public async search(text: string, searchParams?: SearchParams) {
  //   const index = this.getIndex();
  //   return await index.search(text, searchParams);
  // }

  public async getAllIndexes(){
    return await this._client.getIndexes();
  }

  public async getOneIndexes(index_uid: string){
    return await this._client.index(index_uid).getRawInfo();
  }
}