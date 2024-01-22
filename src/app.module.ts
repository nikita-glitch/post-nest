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

@Module({
  imports: [ 
  ConfigModule.forRoot({ envFilePath: '/home/fusion-team/proj/post-nest/src/.env' }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT),
    username: 'postgres',
    password: '1234',
    database: 'postgres_nest',
    entities: [Post, User, Subcategory, Topcategory],
    synchronize: true,
  }), UserModule, PostModule, TopcategoryModule, SubcategoryModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
