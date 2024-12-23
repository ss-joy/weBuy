import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AddUserImageDto } from './dtos/add-user-image.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete('image/:id')
  @HttpCode(204)
  deleteUserImage(@Param('id') id: string) {
    console.log(id);
    return this.usersService.deleteUserImage(id);
  }

  @Post('image/:id')
  @HttpCode(201)
  addUserImage(
    @Body(ValidationPipe) addUserImageDto: AddUserImageDto,
    @Param('id') id: string,
  ) {
    return this.usersService.addUserImage(id, addUserImageDto.imageLink);
  }

  @Get(':id/products')
  getProductsByUserId(@Param('id') id: string) {
    return this.usersService.getProductsByUserId(id);
  }
}
