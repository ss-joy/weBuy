import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    await this.authService.signup(registerUserDto);
    return {
      message: 'User registered successfully',
    };
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, userId, roles } = await this.authService.login(loginUserDto);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: 'strict',
    });
    return {
      userId,
      roles,
    };
  }

  @UseGuards(AuthGuard)
  @Get('test')
  test() {
    return 'hello';
  }
}
