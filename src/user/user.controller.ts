import { Controller, Post, Body, Res, HttpStatus, Next, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { signInSchema, signUpSchema } from 'src/validationSchemas/auth.schema';

// /api/v1/auth/sign-in
// /api/v1/auth/sign-up
// /api/v1/auth/restore-password
// /api/v1/auth/validate-password

// /api/v1/user/ - list
// /api/v1/user/:id - get/delete/update one

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe(signUpSchema))
  async auth(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.userService.create(createUserDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User has been created succsessfully' });
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe(signInSchema))
  async login(
    @Body() LoginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.login(LoginUserDto));
  }
}
