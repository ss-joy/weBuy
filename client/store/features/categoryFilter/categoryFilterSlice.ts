import { CategoriesType } from "@/components/products/ProductsCategory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  category: "",
};
const categorySlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    updateCategoryFilter: (
      state,
      { payload: { category } }: PayloadAction<{ category: CategoriesType }>
    ) => {
      if (category === state.category) {
        state.category = "";
      } else if (state.category === "") {
        state.category = category;
      } else if (state.category !== category) {
        state.category = category;
      } else state.category = "";
    },
  },
});

export default categorySlice.reducer;
export const {
  actions: { updateCategoryFilter },
} = categorySlice;
