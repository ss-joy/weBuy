import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import categoryFilterSlice from "./features/categoryFilter/categoryFilterSlice";
import apiSlice from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice,
    categoryFilter: categoryFilterSlice,
    auth: authSlice.reducer,
  },
  middleware: (gdm) => gdm().concat(apiSlice.middleware),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
