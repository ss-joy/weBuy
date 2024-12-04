import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: [true, 'User name is required'],
  })
  name: string;

  @Prop({
    required: [true, 'User email is required'],
  })
  email: string;

  @Prop({
    required: [true, 'Password is required'],
  })
  password: string;

  @Prop()
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
