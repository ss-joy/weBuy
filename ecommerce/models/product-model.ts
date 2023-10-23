import { Schema, model, models } from "mongoose";
interface IProductSchema {
  name: string;
  description: string;
  price: number;
  imagePath: string;
}
const productSchema = new Schema<IProductSchema>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
});

const Product =
  models.Product || model<IProductSchema>("Product", productSchema);

export default Product;
