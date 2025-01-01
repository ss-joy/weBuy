import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  userId?: string;
  roles?: string[];
};

export type AuthSliceType = User & {
  isAuthenticated: boolean;
};

const initialState: AuthSliceType = {
  userId: undefined,
  roles: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
    },
    logoutUser: (state) => {
      state.userId = undefined;
      state.roles = undefined;
    },
    setUserAuthData: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.userId;
      state.roles = action.payload.roles;
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
