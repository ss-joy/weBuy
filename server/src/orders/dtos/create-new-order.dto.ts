import { Type } from 'class-transformer';
import {
  IsArray,
  IsISO8601,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class OrderedProductDetails {
  @IsNumber()
  @IsPositive()
  orderedProductsCount: number;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}

export class CreateNewOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  buyerId: string;

  @IsArray()
  @IsMongoId({ each: true })
  sellerIds: string[];

  @IsNumber()
  @IsPositive()
  transactionAmount: number;

  @IsISO8601()
  expectedDate: Date;

  @ValidateNested({ each: true })
  @Type(() => OrderedProductDetails)
  @IsArray()
  orderedProducts: OrderedProductDetails[];
}
