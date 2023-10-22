import React from "react";
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return <>{children}</>;
};

export default MainLayout;
