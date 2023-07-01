import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  price: String,
  imagePath: {
    type: String,
    required: true,
  },
});

const Product = models.Product || model("Product", productSchema);
// const Product = model("Product", productSchema);

export default Product;
