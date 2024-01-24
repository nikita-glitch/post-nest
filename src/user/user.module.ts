import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { custonExceptionFilter } from 'src/exceptionFilter/exception.filter';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [UserController],
  providers: [UserService,]
})
export class UserModule {}
