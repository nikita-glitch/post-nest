import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module';
import { TopcategoryModule } from './topcategory/topcategory.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Post } from './post/entities/post.entity';
import { User } from './user/entities/user.entity';
import { Subcategory } from './subcategory/entities/subcategory.entity';
import { Topcategory } from './topcategory/entities/topcategory.entity';
import { APP_FILTER } from '@nestjs/core';
import { custonExceptionFilter } from './exceptionFilter/exception.filter';

const path = '/home/fusion-team/proj/post-nest/src/.env'
@Module({
  imports: [ 
  ConfigModule.forRoot({ envFilePath: path }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Post, User, Subcategory, Topcategory],
    synchronize: true,
  }), UserModule, PostModule, TopcategoryModule, SubcategoryModule ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: custonExceptionFilter
  }],
})
export class AppModule {}
