import { ConfirmOrder } from "@/types";
import apiSlice from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/orders/${userId}`,
    }),
    placeOrder: builder.mutation<any, { data: ConfirmOrder }>({
      query: ({ data }) => ({
        url: "/orders",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const { useGetOrderListQuery, usePlaceOrderMutation } = orderApi;
