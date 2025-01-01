import apiSlice from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/orders/${userId}`,
    }),
  }),
});

export const { useGetOrderListQuery } = orderApi;
