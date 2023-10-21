import { model, Schema } from "mongoose";
interface X {
  age: number;
  sex: string;
}
const x = new Schema<X>({
  age: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
});
export const X = model<X>("X", x);

// const x = new Schema({
//   age: {
//     type: Number,
//     required: true,
//   },
//   sex: {
//     type: String,
//     required: true,
//   },
// });
// export const X = model("X", x);
