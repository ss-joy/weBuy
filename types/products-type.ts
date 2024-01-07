import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0, "Price must be at least 0"),
  imagePath: z.string(),
  sellerName: z.string(),
  sellerId: z.string(),
  productCategory: z.string(),
});

export type productSchemaType = z.infer<typeof productSchema>;
export type sortStype =
  | "priceLowToHigh"
  | "priceHighToLow"
  | "soldMost"
  | "soldLeast"
  | "";

export type OrdersSortStype = "priceLowToHigh" | "priceHighToLow" | "";
