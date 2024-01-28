import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../user/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const user = await this.authService.validateToken(token);
      req['user'] = user;
      next();
    } catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
