import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  userId?: string;
  userEmail?: string;
  roles?: string[];
};

export type AuthSliceType = User & {
  isAuthenticated: boolean;
};

const initialState: AuthSliceType = {
  userId: undefined,
  roles: undefined,
  userEmail: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
      state.userEmail = action.payload.userEmail;
    },
    logoutUser: (state) => {
      state.userId = undefined;
      state.roles = undefined;
      state.userEmail = undefined;
    },
    setUserAuthData: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
      state.userEmail = action.payload.userEmail;
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
