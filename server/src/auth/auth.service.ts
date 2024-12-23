import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.respository';
import { RegisterUserDto } from './dtos/register-user.dto';
import { hash } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(registerUserDto: RegisterUserDto) {
    const hashedPassword = await hash(registerUserDto.password, 10);
    return this.authRepository.signup(registerUserDto, hashedPassword);
  }

  async login(loginUserDto: LoginUserDto) {
    const { userId, roles } = await this.authRepository.login(loginUserDto);
    const token = await this.jwtService.signAsync({
      sub: userId,
      roles: roles,
    });
    return { userId, roles, token };
  }
}
