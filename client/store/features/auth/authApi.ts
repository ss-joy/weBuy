import apiSlice from "../api/apiSlice";
import {
  loginUser,
  logoutUser,
  setAuthStatus,
  setUserAuthData,
  User,
} from "./authSlice";

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
            })
          );
          dispatch(
            setAuthStatus({
              userId: data.data.userId as string,
            })
          );
        } catch (error) {
          dispatch(
            setAuthStatus({
              userId: undefined,
            })
          );
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
            setUserAuthData({
              userId: userData.data.userId,
              roles: userData.data.roles,
            })
          );
          dispatch(
            setAuthStatus({
              userId: userData.data.userId,
            })
          );
        } catch (error) {
          dispatch(
            setUserAuthData({
              userId: undefined,
              roles: undefined,
            })
          );
          dispatch(
            setAuthStatus({
              userId: undefined,
            })
          );
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useCheckAuthStatusQuery } =
  authApi;
