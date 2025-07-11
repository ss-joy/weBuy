import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  userId?: string;
  userEmail?: string;
  roles?: string[];
};

export type AuthSliceType = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: AuthSliceType = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = {
        userId: action.payload.userId,
        roles: action.payload.roles,
        userEmail: action.payload.userEmail,
      };
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice;
