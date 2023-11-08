import React, { createContext, useState } from "react";

type CartItem = {
  productId: string;
  productQuantity: number;
};
interface CartContextType {
  increaseProductQuanity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  products: CartItem[];
}

type CartContextProviderProps = {
  children: React.ReactNode;
};

export const cartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
}: CartContextProviderProps): JSX.Element {
  const [products, setProducts] = useState<CartItem[]>([]);
  /**
   * case1:cart array is empty. ok
   * case2:cart array is no empty. But doesnt have the product. ok
   * case3:cart is not empty. And has the product. ok
   */
  function increaseProductQuanity(productId: string): void {
    const product = products.find((element) => {
      return element.productId === productId;
    });
    if (!product) {
      const newProducts = products.map((element) => {
        return { ...element };
      });
      newProducts.push({
        productId: productId,
        productQuantity: 1,
      });
      setProducts(newProducts);
      return;
    }

    const newProducts = products.map((element) => {
      if (element.productId !== productId) {
        return { ...element };
      }
      return { ...element, productQuantity: element.productQuantity + 1 };
    });
    setProducts(newProducts);
    return;
  }

  function decreaseProductQuantity(productId: string): void {
    const product = products.find((element) => {
      return element.productId === productId;
    });
    if (!product) {
      return;
    }
    if (product.productQuantity === 0) {
      return;
    }
    const newProducts = products.map((element) => {
      if (element.productId !== productId) {
        return { ...element };
      }
      return { ...element, productQuantity: element.productQuantity - 1 };
    });
    setProducts(newProducts);
  }
  console.log(products);
  return (
    <cartContext.Provider
      value={{
        products,
        increaseProductQuanity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
