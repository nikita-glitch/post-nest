import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/Guards/roleGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/Guards/authGuard';
import { Topcategory } from 'src/topcategory/entities/topcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subcategory, Topcategory]), JwtModule],
  controllers: [SubcategoryController],
  providers: [SubcategoryService, {
    provide: APP_GUARD,
    useClass: RoleGuard
  }, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class SubcategoryModule {}
