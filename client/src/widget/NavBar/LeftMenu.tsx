import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

interface LeftMenuProps {
}

const LeftMenu: React.FC<LeftMenuProps> = ({}) => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Menu mode={'inline'} style={{ display: "flex", margin: "10px 0", justifyContent: "start", alignItems: "center" }}>
      <Menu.Item key="home" onClick={() => navigate("/")}>
        Главная
      </Menu.Item>
      {!user ? (
        <>
          <Menu.Item key="signin" onClick={() => navigate("/signin")}>
            Войти
          </Menu.Item>
          <Menu.Item key="signup" onClick={() => navigate("/signup")}>
            Регистрация
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="constructor" onClick={() => navigate("/constructor")}>
            Создать файл
          </Menu.Item>
          <Menu.Item key="lyric-files" onClick={() => navigate("/lyric-files")}>
            Готовые файлы
          </Menu.Item>
          <Menu.Item key="favorites" onClick={() => navigate("/favorites")}>
            Избранное
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default LeftMenu;
