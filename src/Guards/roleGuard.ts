import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<'user' | 'admin'>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (requiredRole === 'user') {
      return true
    }
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || Object.keys(token).length === 0) {
    }
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });
    const user = await this.userRep.findOneBy({ id: decodedToken.id });
    if (!user) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    if (user.role === 'admin') {
      return true
    }
    return user.role === requiredRole;
  }
}
