import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { NextFunction } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtServise: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;
    const person = await this.userRepository.findOneBy({ email: email });
    if (person) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPass = await bcrypt.hash(password, 3);
    const user = this.userRepository.create({
      name: name,
      email: email,
      password: hashedPass,
    });
    await this.userRepository.save(user);
  }

  async login(LoginUserDto: LoginUserDto): Promise<string> {
    const { email, password } = LoginUserDto;
    const person = await this.userRepository.findOneBy({ email: email });
    if (!person) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }
    const comparedPass = await bcrypt.compare(password, person.password);
    if (!comparedPass) {
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.jwtServise.signAsync(
      { id: person.id },
      { secret: process.env.SECRET_KEY },
    );
    return token;
  }
}
