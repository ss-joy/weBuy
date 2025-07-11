import apiSlice from "../api/apiSlice";
import { loginUser, logoutUser, User } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      User,
      {
        email: string;
        password: string;
      }
    >({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(
            loginUser({
              userId: data.data.userId,
              roles: data.data.roles,
              userEmail: data.data.userEmail,
            })
          );
        } catch (error) {
          dispatch(logoutUser());
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
        } catch (error) {}
      },
    }),
    checkAuthStatus: builder.query({
      query: () => "/auth/me",
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const userData = await queryFulfilled;
          dispatch(
            loginUser({
              userId: userData.data.userId,
              roles: userData.data.roles,
              userEmail: userData.data.userEmail,
            })
          );
        } catch (error) {
          dispatch(logoutUser());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useCheckAuthStatusQuery } =
  authApi;
