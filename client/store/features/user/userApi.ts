import { SubmissionData, User } from "@/types";
import apiSlice from "../api/apiSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { ecomBackendUrl } from "@/config";
import axios from "axios";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, { userId: string }>({
      query: ({ userId }) => {
        return `/user/${userId}`;
      },
      providesTags: (result, error, arg, meta) => [
        { type: "User", id: arg.userId },
      ],
    }),

    getProductsOfAUser: builder.query<any, { userId: string }>({
      query: ({ userId }) => `/user/products/${userId}`,
    }),

    saveUserData: builder.mutation<
      any,
      { userId: string; data: SubmissionData }
    >({
      query: ({ userId, data }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg, _meta) => [
        { type: "User", id: arg.userId },
      ],
    }),

    deleteUserImage: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/user/image/${userId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: (result, error, arg, meta) => [
        { type: "User", id: arg.userId },
      ],
    }),
    addUserImage: builder.mutation<
      unknown,
      { userId: string; userPofileImage: File }
    >({
      queryFn: async ({ userId, userPofileImage }) => {
        try {
          const imageRef = ref(
            storage,
            `user-profile-images/${File.name + crypto.randomUUID() + Date.now()}`
          );
          await uploadBytes(imageRef, userPofileImage as File);
          const url = await getDownloadURL(imageRef);
          const response = await axios.post<unknown>(
            `${ecomBackendUrl}/user/image/${userId}`,
            {
              imageLink: url,
            },
            {
              withCredentials: true,
            }
          );
          return {
            data: response.data,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: "Image uplaod failed",
            },
          };
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "User", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsOfAUserQuery,
  useDeleteUserImageMutation,
  useSaveUserDataMutation,
  useAddUserImageMutation,
} = userApi;
