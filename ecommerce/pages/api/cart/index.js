/**
 *
 * dummy
 */
import Cart from "@/models/cart-model";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const addCart = new Cart({
      userEmail: "324234234",

      product: [
        {
          name: "joy",
          id: "ewrwe",
          price: "45454",
          quantity: "3454",
        },
        {
          name: "joy",
          id: "ewrwe",
          price: "45454",
          quantity: "3454",
        },
      ],
    });
    const cart = await addCart.save();
    res.json(cart);
  }
}
