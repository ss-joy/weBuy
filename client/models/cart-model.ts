import { Schema, model, models } from "mongoose";

interface ICartProduct {
  name: string;
  id: string;
  price: string;
  quantity: string;
}
const cartProductSchema = new Schema<ICartProduct>({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});
//could be errors here
interface Icart {
  userEmail: string;
  product: ICartProduct[];
}
const cartSchema = new Schema<Icart>({
  userEmail: { type: String, required: true },

  product: [cartProductSchema],
});

const Cart = models?.Cart || model<Icart>("Cart", cartSchema);

export default Cart;
