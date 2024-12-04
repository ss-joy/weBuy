import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserImageDto {
  @IsString()
  @IsNotEmpty()
  imageLink: string;
}
