import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable() 
export class AuthGuard implements CanActivate{
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,
    
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    
      const req = context.switchToHttp().getRequest();
      const next = context.switchToHttp().getNext();
      try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token || Object.keys(token).length === 0) {
        throw new JsonWebTokenError('invalid token')
      }
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY });
      const user = await this.userRep.findOneBy({ id: decodedToken.id });
      if (!user) {
        throw new HttpException('User does not found', HttpStatus.NOT_FOUND)
      }
      req.body.id = decodedToken.id;
      return true;
    } catch (error) {
      next(error)
    }
  }
}