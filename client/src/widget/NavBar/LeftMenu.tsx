import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { ROUTES } from "@/app/router/routes";

interface LeftMenuProps {
  mode: "horizontal" | "vertical" | "inline";
}

const LeftMenu: React.FC<LeftMenuProps> = ({ mode }) => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Menu mode={mode} style={{ display: "flex", margin: "10px 0", justifyContent: "start", alignItems: "center" }}>
      <Menu.Item key="home" onClick={() => navigate("/")}>
        Главная
      </Menu.Item>
      {!user ? (
        <>
          <Menu.Item key="signin" onClick={() => navigate(ROUTES.SIGNIN)}>
            Войти
          </Menu.Item>
          <Menu.Item key="signup" onClick={() => navigate(ROUTES.SIGNUP)}>
            Регистрация
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="constructor" onClick={() => navigate(ROUTES.CONSTRUCTOR)}>
            Создать файл
          </Menu.Item>
          <Menu.Item key="lyric-files" onClick={() => navigate(ROUTES.LYRIC_FILES)}>
            Готовые файлы
          </Menu.Item>
          {user.isAdmin && (
            <Menu.Item key="admin-panel" onClick={() => navigate(ROUTES.ADMIN)}>
              Панель администратора
            </Menu.Item>
          )}
        </>
      )}
    </Menu>
  );
};

export default LeftMenu;
