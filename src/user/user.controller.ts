import { Controller, Post, Body, Res, HttpStatus, UseGuards, Next } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, NextFunction } from 'express';
import { LoginUserDto } from './dto/login-user.dto';


@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService
    //private readonly guardsServ
    ) {}

  @Post('/auth')
  async auth(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Next()	next: NextFunction
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
  
  @Post('/login')
  async login(
    @Body() LoginUserDto: LoginUserDto,
    @Res() res: Response,
    @Next()	next: NextFunction
  ): Promise<any> {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.userService.login(LoginUserDto));
    } catch (error) {
      next(error)
    }
  }
}
