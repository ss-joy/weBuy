import { Schema, model, models } from "mongoose";

const cartProductSchema = new Schema({
  name: String,
  id: String,
  price: String,
  quantity: String,
});

const cartSchema = new Schema({
  userEmail: { type: String, required: true },

  product: [cartProductSchema],
});

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;
