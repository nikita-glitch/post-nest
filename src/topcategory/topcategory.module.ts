import { Module } from '@nestjs/common';
import { TopcategoryService } from './topcategory.service';
import { TopcategoryController } from './topcategory.controller';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/Guards/roleGuard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topcategory } from './entities/topcategory.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/Guards/authGuard';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topcategory, User, Subcategory]), JwtModule],
  controllers: [TopcategoryController],
  providers: [TopcategoryService, ],
})
export class TopcategoryModule {}
