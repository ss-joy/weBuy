import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/product.schema';
import { User } from 'src/users/users.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    type: String,
    required: [true, 'transaction id is required'],
  })
  trxId: string;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: User.name,
    required: [true, 'Id of the buyer is required'],
  })
  buyerId: User;

  @Prop({
    type: Number,
    required: [true, 'Total transaction amount is required'],
  })
  transactionAmount: number;

  @Prop({
    type: String,
    enum: ['pending', 'cancelled', 'delivered'],
    default: 'pending',
  })
  orderStatus: string;

  @Prop({
    type: Date,
    required: [true, 'An expected date for the order is required'],
  })
  expectedDate: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  orderPlacementDate: Date;

  @Prop({
    type: [
      {
        orderedProductsCount: { type: Number, required: true },
        sellerId: {
          type: mongoose.Schema.ObjectId,
          ref: User.name,
        },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: Product.name,
        },
      },
    ],
    required: [
      true,
      'Both amount of an ordered product and the product ids are required.',
    ],
  })
  orderedProducts: { productId: Product; orderedCount: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
