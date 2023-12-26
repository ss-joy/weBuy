import { z } from "zod";

// export interface ProductType {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   imagePath: string;
// }
export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0, "Price must be at least 0"),
  imagePath: z.string(),
  sellerName: z.string(),
  sellerId: z.string(),
});

export type productSchemaType = z.infer<typeof productSchema>;
