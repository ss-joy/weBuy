import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongoose object id');
    }
    const user = await this.userModel.findById(id).select('-__v -password');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  updateUser(updateUserDto: UpdateUserDto, id: string, hashedPassword: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid mongoose object id');
    }

    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: hashedPassword,
          profilePicture: updateUserDto.profilePicture,
        },
        {
          returnDocument: 'after',
        },
      )
      .select('-__v -password');
  }

  deleteUserImage(userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid Mongo User id');
    }

    return this.userModel.findByIdAndUpdate(userId, {
      profilePicture: '',
    });
  }

  addUserImage(userId: string, imageLink: string) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          profilePicture: imageLink,
        },
        {
          returnDocument: 'after',
        },
      )
      .select('-__v -password');
  }
}
