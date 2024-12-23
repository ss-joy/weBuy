import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: [true, 'User name is required'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'User email is required'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop({
    type: String,
  })
  profilePicture: string;

  @Prop({
    type: [mongoose.Schema.ObjectId],
    ref: 'Product',
    required: [true, 'User id is required'],
  })
  products: Product[];

  @Prop({
    type: [String],
    enum: ['user', 'admin'],
    default: ['user'],
    required: [true, 'user role is required'],
  })
  roles: string[];

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
