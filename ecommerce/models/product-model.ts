import { Schema, model, models } from "mongoose";
interface IProductSchema {
  name: string;
  description: string;
  price: string;
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
    type: String,
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
