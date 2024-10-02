import React, { useCallback, useEffect } from "react";
import { refreshAccessToken, UserService } from "@/entities/user";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Navbar } from "@/widget/NavBar";

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
    </>
  );
};

export default Layout;
