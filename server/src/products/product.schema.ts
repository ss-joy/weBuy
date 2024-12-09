import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    required: [true, 'Product name is required'],
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
    required: [true, 'Selled id is required'],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  sellerId: User;

  @Prop()
  imagePath: string;

  @Prop({
    default: 0,
  })
  sellCount: number;

  @Prop({
    required: [true, 'Product category is requied'],
  })
  productCategory: string;

  @Prop({
    required: [true, 'Avaialable count is needed'],
    type: Number,
  })
  availableCount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
