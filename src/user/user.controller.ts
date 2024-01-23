import { Controller, Post, Body, Res, HttpStatus, Next } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NextFunction, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { IsPublic } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';

// /api/v1/auth/sign-in
// /api/v1/auth/sign-up
// /api/v1/auth/restore-password
// /api/v1/auth/validate-password

// /api/v1/user/ - list
// /api/v1/user/:id - get/delete/update one
@IsPublic(true)
//@Roles('user')
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService
    ) {}

  @Post('sign-up')
  async auth(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Next() next: NextFunction
  ): Promise<any> {
    try {      
      await this.userService.create(createUserDto);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'User has been created succsessfully' });
    } catch (error) {
      next(error)
    }
  }

  @Post('sign-in')
  async login(
    @Body() LoginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.userService.login(LoginUserDto));
    } catch (error) {
    }
  }
}
