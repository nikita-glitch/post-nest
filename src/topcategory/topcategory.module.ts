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

@Module({
  imports: [TypeOrmModule.forFeature([Topcategory, User]), JwtModule],
  controllers: [TopcategoryController],
  providers: [TopcategoryService, {
    provide: APP_GUARD,
    useClass: RoleGuard
  }, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class TopcategoryModule {}
