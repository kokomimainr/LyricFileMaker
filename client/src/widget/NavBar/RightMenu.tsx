import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

interface RightMenuProps {
  mode: "horizontal" | "vertical" | "inline";
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            {user && (
              <Avatar
                style={{
                  backgroundColor: "#fe9fad",
                  verticalAlign: "middle",
                  fontSize: "25px",
                  textShadow: "unset",
                }}
                size="large"
                gap={100}
              >
                {user.username ? user.username.charAt(0).toUpperCase() : "-"}
              </Avatar>
            )}
            <span className="username">{user?.username}</span>
          </>
        }
      >
        <Menu.Item key="about-us" onClick={() => navigate("/profile")}>
          <UserOutlined /> Профиль
        </Menu.Item>
        <Menu.Item key="log-out" onClick={() => navigate("/logout")}>
          <LogoutOutlined /> Выйти
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
