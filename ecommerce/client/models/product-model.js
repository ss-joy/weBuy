import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  price: String,
});

const Product = models.Product || model("Product", productSchema);
// const Product = model("Product", productSchema);

export default Product;
