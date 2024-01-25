import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenExtractor } from './tokenExtractor/tokenExtractor';

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
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    const tokenExtractor = new TokenExtractor(this.jwtService);
    const decodedToken = await tokenExtractor.extract(token);
    const user = await this.userRep.findOneBy({ id: decodedToken.id });
    if (!user) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }
    return user.role === requiredRole;
  }
}
