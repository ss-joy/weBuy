import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import categoryFilterSlice from "./features/categoryFilter/categoryFilterSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    categoryFilter: categoryFilterSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
