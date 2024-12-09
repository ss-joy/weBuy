import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  imagePath: string;

  @IsMongoId()
  sellerId: string;

  @IsString()
  productCategory: string;

  @IsNumber()
  availableCount: number;
}
