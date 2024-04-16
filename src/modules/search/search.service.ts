import { Injectable } from "@nestjs/common";
import MeiliSearch, { Index } from "meilisearch";

@Injectable()
export class SearchService {
  private _client: MeiliSearch;

  constructor() {
    this._client = new MeiliSearch({
      host: 'http://localhost:7700/',
    });
  }

  public getIndex(index_uid: string): Index {
    return this._client.index(index_uid);
  }

  public async getsearch(index_uid: string, search_query: any){
    const index = this.getIndex(index_uid);
    const searchData = await index.search(search_query, {
      attributesToHighlight: ['name']
    });

    console.log("searchData ", searchData);

    return searchData;
  }
}