import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline";
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const navigate = useNavigate()

  return (
      <Menu mode={mode}>
        <Menu.SubMenu
          title={
            <>
              <Avatar icon={<UserOutlined />} />
            </>
          }
        >
          <Menu.Item key="project">
            <CodeOutlined /> Projects
          </Menu.Item>
          <Menu.Item key="about-us">
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item key="log-out" onClick={() => navigate('/logout')}>
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    )
};

export default RightMenu;
