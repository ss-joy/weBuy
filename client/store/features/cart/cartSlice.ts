import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  productId: string;
  productQuantity: number;
  productPrice: number;
  productSellerId: string;
};

const initialState: {
  cartItems: CartItem[];
} = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.cartItems.length = 0;
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
    },
  },
});
export default cartSlice.reducer;
export const {
  actions: { increaseCartItemQuantity, emptyCart, decreaseCartItemQuantity },
} = cartSlice;
