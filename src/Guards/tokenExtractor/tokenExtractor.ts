import { HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DecodedTokenInterface } from "src/interfaces/Interfaces";

export class TokenExtractor {
  constructor(
    private jwtService: JwtService
  ) {}
  async extract(token: string): Promise<DecodedTokenInterface> {
    if (!token || Object.keys(token).length === 0) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });
    return decodedToken
  }
}