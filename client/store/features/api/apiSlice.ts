import { ecomBackendUrl } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: ecomBackendUrl,
    credentials: "include",
  }),

  endpoints: (builder) => ({}),
});
export default apiSlice;
