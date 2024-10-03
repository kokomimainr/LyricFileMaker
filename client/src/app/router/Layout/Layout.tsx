import React, { useEffect } from "react";
import { refreshAccessToken } from "@/entities/user";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Navbar } from "@/widget/NavBar";
import { AppFooter } from "@/widget/Footer";

type LayoutProps = {};

export const Layout: React.FC<LayoutProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
      <AppFooter/>
    </>
  );
};

export default Layout;
