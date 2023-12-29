import { z } from "zod";

export const shoppingTransactionSchema = z.object({
  buyerEmail: z.string(),
  buyerId: z.string(),
  totalCost: z.number(),
  cartProductsDetails: z.array(
    z.object({
      productId: z.string(),
      productPrice: z.number(),
      productQuantity: z.number(),
      productSellerId: z.string(),
    })
  ),
});
export const ProductTransactionSchema = z.object({
  productId: z.string(),
  productPrice: z.number(),
  productQuantity: z.number(),
  productSellerId: z.string(),
});
export type ProductTransactionSchemaType = z.infer<
  typeof ProductTransactionSchema
>;

export type ShoppingTransactionSchemaType = z.infer<
  typeof shoppingTransactionSchema
>;
