import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(registerUserDto: RegisterUserDto, hashedPassword: string) {
    const user = await this.userModel.findOne({
      email: registerUserDto.email,
    });
    if (user) {
      throw new ConflictException('user with this email already exists');
    }
    return this.userModel.create({
      email: registerUserDto.email,
      password: hashedPassword,
      name: registerUserDto.name,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });
    if (!user) throw new NotFoundException('The user is not registered yet');

    try {
      await compare(user.password, loginUserDto.password);
      return {
        userId: user._id,
        roles: [...user.roles],
      };
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
