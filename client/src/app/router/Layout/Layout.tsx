import React, { useEffect } from "react";
import { refreshAccessToken } from "@/entities/user";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { Navbar } from "@/widget/NavBar";
import { AppFooter } from "@/widget/Footer";
import { Layout } from "antd";
import { ROUTES } from "../routes";

const { Content } = Layout;

type LayoutProps = {};

export const AppLayout: React.FC<LayoutProps> = ({}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  useEffect(() => {
    // Устанавливаем заголовок страницы в зависимости от текущего пути
    switch (location.pathname) {
      case ROUTES.HOME:
        document.title = 'LFM';
        break;
      case ROUTES.SIGNUP:
        document.title = 'Регистрация';
        break;
      case ROUTES.SIGNIN:
        document.title = 'Авторизация';
        break;
      case ROUTES.ERROR:
        document.title = 'Страница не найдена';
        break;
      case ROUTES.FAVORITES:
        document.title = 'Избранные';
        break;
      case ROUTES.PROFILE:
        document.title = 'Профиль';
        break;
      case ROUTES.ADMIN:
        document.title ='Панель администратора';
        break;
      case ROUTES.CONSTRUCTOR:
        document.title = 'Создание файла';
        break;
      case ROUTES.WORKSPACE:
        document.title = 'Рабочее пространство';
        break;
      case ROUTES.LOGOUT:
        document.title = 'Выход';
        break;
      case ROUTES.LYRIC_FILES:
        document.title = 'Все файлы';
        break;
      case ROUTES.LYRIC_FILE_CARD:
        document.title = 'Файл';
        break;
      case ROUTES.RESET:
        document.title = 'Сброс пароля';
        break;
      default:
        document.title = 'Our Notes';
    }
  }, [location]);

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
