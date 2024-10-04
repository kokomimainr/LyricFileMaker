import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export const Navbar: React.FC = () => {
  const {user} = useAppSelector(state => state.user)
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo pointer" style={{ display: "flex", alignItems: "center" }} onClick={() => navigate("/")}>
            <img style={{ width: "40px" }} src="/img/Icon.png" alt="" />
            <h3 style={{fontSize: "17px"}} className="brand-font">Lyric File Maker</h3>
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <LeftMenu mode={"horizontal"} />
            </div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              {user && (<RightMenu mode={"horizontal"} />)}
            </div>

            <Drawer
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={"inline"} />
              {user && (<RightMenu mode={"inline"} />)}
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};
