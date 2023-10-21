import { Schema, model } from "mongoose";
interface ISecret {
  user_id: string;
  name: string;
  email: string;
  secret: string;
}
const secretSchema = new Schema<ISecret>({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const Secret = model<ISecret>("Secret", secretSchema);
export default Secret;
