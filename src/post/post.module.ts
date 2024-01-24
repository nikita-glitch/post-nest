import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/Guards/authGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Subcategory]), JwtModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
