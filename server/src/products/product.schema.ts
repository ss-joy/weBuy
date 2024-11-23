import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    required: [true, 'name is required'],
  })
  name: string;

  @Prop({
    required: [true, 'Description is required'],
  })
  description: string;

  @Prop({
    required: [true, 'Price is required'],
  })
  price: number;

  @Prop({
    required: [true, 'Seller name is required'],
  })
  sellerName: string;

  @Prop({
    required: [true, 'is required'],
  })
  sellerId: string;

  @Prop()
  imagePath: string;

  @Prop()
  sellCount: number;

  @Prop()
  productCategory: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
