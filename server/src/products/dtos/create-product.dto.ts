import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  imagePath: string;

  @IsString()
  sellerName: string;

  @IsString()
  sellerId: string;

  @IsString()
  productCategory: string;
}
