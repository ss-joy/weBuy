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

export const FetchTransactionSchema = z.object({
  buyerEmail: z.string(),
  buyerId: z.string(),
  totalCost: z.number(),
  trxDate: z.date(),
  trxId: z.string(),
  trxStatus: z.string(),
  _id: z.string(),
  transactionsItemsLists: z.array(
    z.object({
      productId: z.string(),
      productPrice: z.number(),
      productQuantity: z.number(),
    })
  ),
});
export const ProductSchema = z.object({
  productId: z.string(),
  productPrice: z.number(),
  productQuantity: z.number(),
  productSellerId: z.string(),
});
export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type FetchTransactionSchemaType = z.infer<typeof FetchTransactionSchema>;
