import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cutOutFirst100Words(text: string) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 38);
  return cutWords.join(" ");
}

import Product from "@/models/product-model";
import { ProductTransactionSchemaType } from "@/schemas/shopping-transaction-schema";

export async function incrementProductSellCOunt(
  product: ProductTransactionSchemaType
) {
  try {
    const productFound = await Product.findOne({ _id: product.productId });
    if (!productFound) {
      throw new Error("error finding product");
    }
    const update = await Product.updateOne(
      { _id: productFound._id },
      { sellCount: productFound.sellCount + product.productQuantity }
    );
    if (!update) {
      throw new Error("error incrementing product");
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
}
