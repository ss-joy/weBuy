import { Product } from "@/types/products-type";
import apiSlice from "../api/apiSlice";

const productAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<
      Product[],
      { category: string; page: number; limit: number }
    >({
      query: ({ category, page, limit }) => {
        return `/products/?productCategory=${category}&page=${page}&limit=${limit}`;
      },
    }),
    getProduct: builder.query<Product, { id: string }>({
      query: ({ id }) => `/products/${id}`,
    }),
  }),
});
export const { useGetAllProductQuery, useGetProductQuery } = productAPi;
