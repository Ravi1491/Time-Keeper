import { forwardRef, Module } from '@nestjs/common';  
import { DocumentModule } from './documents/document.module';
import { IndexModule } from './indexes/index.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [DocumentModule, IndexModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
