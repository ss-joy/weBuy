import { Schema, model, models } from "mongoose";
interface IUser {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
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
  profilePicture: {
    type: String,
  },
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
