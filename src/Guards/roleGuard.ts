import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenExtractor } from './tokenExtractor/tokenExtractor';
import { Roles } from 'src/decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<'user' | 'admin'>('roles', context.getHandler());
    if (!role) {
      return true
    }
    const req = context.switchToHttp().getRequest();
    const id = req.params.userId
    const user = await this.userRep.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }    
    return user.role === role;
  }
}
