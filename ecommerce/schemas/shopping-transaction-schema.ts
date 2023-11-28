import { z } from "zod";

export const shoppingTransactionSchema = z.object({
  userEmail: z.string(),
  userId: z.string(),
  amount: z.number(),
});

export type ShoppingTransactionSchemaType = z.infer<
  typeof shoppingTransactionSchema
>;
