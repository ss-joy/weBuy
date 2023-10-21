import { Schema, model } from "mongoose";
interface IUser {
  name: String;
  email: String;
  password: String;
  money: number;
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    default: 90000,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
