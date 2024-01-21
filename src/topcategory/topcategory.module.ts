import { Module } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { TopcategoryController } from './topcategory.controller';

@Module({
  controllers: [TopcategoryController],
  providers: [TopcategoryService],
})
export class TopcategoryModule {}
