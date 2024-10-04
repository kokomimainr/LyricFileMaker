import React, { useEffect } from "react";
import { refreshAccessToken } from "@/entities/user";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Navbar } from "@/widget/NavBar";
import { AppFooter } from "@/widget/Footer";
import { Layout } from "antd";

const { Content } = Layout;

type LayoutProps = {};

export const AppLayout: React.FC<LayoutProps> = ({}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);

  return (
    <>
      <Layout className="layout">
        <Navbar />
        <Content>
        <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </>
  );
};

export default Layout;
