import { User } from "@/types";
import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, { userId: string }>({
      query: ({ userId }) => {
        return `/user/${userId}`;
      },
    }),

    getProductsOfAUser: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/user/products/${userId}`,
    }),
  }),
});

export const { useGetUserQuery, useGetProductsOfAUserQuery } = userApi;
