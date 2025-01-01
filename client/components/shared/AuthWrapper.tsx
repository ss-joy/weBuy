import { useAppSelector } from "@/hooks/redux-hooks";
import { useCheckAuthStatusQuery } from "@/store/features/auth/authApi";
import React, { ReactNode } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  //polling polls the server
  //auto logs out user
  useCheckAuthStatusQuery(undefined, {
    pollingInterval: 1 * 60 * 1000,
  });

  return <>{children}</>;
};

export default AuthWrapper;
