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
          <div style={{ display: "flex", alignItems: "center", padding: "0", margin: "0" }}>
            {user?.avatar ? null : (
              <Avatar
                style={{
                  backgroundColor: "#fe9fad",
                  fontSize: "25px",
                  textShadow: "unset",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: user?.avatar ? "50px" : "40px",
                  height: user?.avatar ? "50px" : "40px",
                }}
                size={user?.avatar ? "large" : "default"}
                gap={100}
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "-"}
              </Avatar>
            )}
            <Avatar
              src={user?.avatar ? `${import.meta.env.VITE_IMG}/${user?.avatar}` : undefined}
              style={{
                backgroundColor: "#fe9fad",
                fontSize: "25px",
                textShadow: "unset",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: user?.avatar ? "50px" : "40px",
                height: user?.avatar ? "50px" : "40px",
              }}
              size={user?.avatar ? "large" : "default"}
              gap={100}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "-"}
            </Avatar>
            <span className="username" style={{ marginLeft: "10px", lineHeight: "1" }}>
              {user?.username}
            </span>
          </div>
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