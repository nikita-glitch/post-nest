import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    private jwtService: JwtService,

  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization.split(' ')[1];
      if (!token || Object.keys(token).length === 0) {
        
      }
      console.log(token);
      
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY });
      const user = await this.userRep.findOneBy({ id: decodedToken.id });
      if (!user) {
        
      }
      if (decodedToken.role === 'user') {
        return false
      }
      return true;
    } catch (error) {
      
    }
  }
}