import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline";
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const navigate = useNavigate();
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="project" onClick={() => navigate("/projects")}>
          <CodeOutlined /> Ваши файлы
        </Menu.Item>
        <Menu.Item key="about-us" onClick={() => navigate("/profile")}>
          <UserOutlined /> Профиль
        </Menu.Item>
        <Menu.Item key="log-out" onClick={() => navigate("/logout")}>
          <LogoutOutlined /> Выход
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
