import { Schema, model, models } from "mongoose";
interface IProductSchema {
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerName: string;
  sellerId: string;
  sellCount: number;
  productCategory: string;
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
  sellerName: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  sellCount: {
    type: Number,
    default: 0,
  },
  productCategory: {
    type: String,
    required: true,
  },
});

const Product =
  models?.Product || model<IProductSchema>("Product", productSchema);

export default Product;
