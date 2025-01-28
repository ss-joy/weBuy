import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  userId?: string;
  userEmail?: string;
  roles?: string[];
};

export type AuthSliceType = {
  user: User;
  isAuthenticated: boolean;
};

const initialState: AuthSliceType = {
  user: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user.userId = action.payload.userId;
      state.user.roles = action.payload.roles;
      state.user.userEmail = action.payload.userEmail;
    },
    logoutUser: (state) => {
      state.user.userId = undefined;
      state.user.roles = undefined;
      state.user.userEmail = undefined;
    },
    setUserAuthData: (state, action: PayloadAction<User>) => {
      state.user.userId = action.payload.userId;
      state.user.roles = action.payload.roles;
      state.user.userEmail = action.payload.userEmail;
    },
    setAuthStatus: (
      state,
      action: PayloadAction<{ userId: string | undefined }>
    ) => {
      state.isAuthenticated = !!action.payload.userId;
    },
  },
});

export const { loginUser, logoutUser, setUserAuthData, setAuthStatus } =
  authSlice.actions;
export default authSlice;
