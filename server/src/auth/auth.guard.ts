import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const { token } = request.cookies;
    if (!token) {
      throw new UnauthorizedException('You are not authenticated');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.body.userData = decoded;
    } catch (error) {
      response.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
      });
      throw new ForbiddenException('You are not authenticated');
    }

    return true;
  }
}
