import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Topcategory } from 'src/topcategory/entities/topcategory.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subcategory, Topcategory, Post]), JwtModule],
  controllers: [SubcategoryController],
  providers: [SubcategoryService, ],
})
export class SubcategoryModule {}
