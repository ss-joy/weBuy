import { Product } from "@/types/products-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  productSellerId: string;
};

function initialCartData(): CartItem[] {
  if (typeof window === "undefined") return [];
  const cartSavedToLocalStorage = localStorage.getItem("we-buy-cart");
  return cartSavedToLocalStorage ? JSON.parse(cartSavedToLocalStorage) : [];
}

function updateCartDataOnLocalStorage(cartData: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("we-buy-cart", JSON.stringify(cartData));
}

const initialState: {
  cartItems: CartItem[];
} = {
  cartItems: initialCartData(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.cartItems.length = 0;
      updateCartDataOnLocalStorage(state.cartItems);
    },
    increaseCartItemQuantity: (
      state,
      {
        payload: { productId, productPrice, productSellerId },
      }: PayloadAction<{
        productId: string;
        productPrice: number;
        productSellerId: string;
      }>
    ) => {
      const productExists = state.cartItems.find(
        (data) => data.productId === productId
      );
      if (!productExists) {
        state.cartItems.push({
          productId,
          productPrice,
          productQuantity: 1,
          productSellerId,
        });
      } else {
        state.cartItems.forEach((data) => {
          if (data.productId === productId) {
            data.productQuantity++;
          }
        });
      }
      updateCartDataOnLocalStorage(state.cartItems);
    },
    decreaseCartItemQuantity: (
      state,
      { payload: { productId } }: PayloadAction<{ productId: string }>
    ) => {
      const productExists = state.cartItems.find(
        (data) => data.productId === productId
      );
      if (!productExists) {
        return;
      } else if (productExists.productQuantity === 1) {
        const filteredCartItems = state.cartItems.filter(
          (data) => data.productId !== productId
        );
        state.cartItems = filteredCartItems;
      } else {
        state.cartItems.forEach((data) => {
          if (data.productId === productId) {
            data.productQuantity--;
          }
        });
      }
      updateCartDataOnLocalStorage(state.cartItems);
    },
    deleteProductFromCart: (
      state,
      { payload: { productId } }: PayloadAction<{ productId: string }>
    ) => {
      const updatedCartItems = state.cartItems.filter(
        (ci) => ci.productId !== productId
      );
      state.cartItems = updatedCartItems;
      updateCartDataOnLocalStorage(state.cartItems);
    },
  },
});
export default cartSlice.reducer;
export const {
  actions: {
    increaseCartItemQuantity,
    emptyCart,
    decreaseCartItemQuantity,
    deleteProductFromCart,
  },
} = cartSlice;
