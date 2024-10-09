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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0",
              margin: "0",
            }}
          >
              <Avatar style={{ backgroundColor: "#fe9fad", width: "40px", height: "40px", marginTop: "5px", marginBottom: "15px" }}  
              className={user?.avatar ? 'avatar-with-src' : 'avatar-without-src'}
              src={user?.avatar
                ? `${import.meta.env.VITE_IMG}/${user?.avatar}`
                : undefined}
                >
                  {user?.username ? user.username.charAt(0).toUpperCase() : "-"}
              </Avatar>
            <span
              className="username"
              style={{ marginLeft: "10px", lineHeight: "1" }}
            >
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
