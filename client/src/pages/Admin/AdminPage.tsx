import React, { useEffect } from "react";
import styles from "./AdminPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { ROUTES } from "@/app/router/routes";
import { refreshAccessToken } from "@/entities/user";
import PublicationRequestList from "@/widget/PublicationRequestList/PublicationRequestList";

type AdminPageProps = {};

export const AdminPage: React.FC<AdminPageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    user
      ? user.isAdmin
        ? true
        : navigate(ROUTES.HOME)
      : dispatch(refreshAccessToken());
  }, [user, dispatch]);
  return (
    <>
      <div className={styles.container}>
        <h1>Админ панель</h1>
        <PublicationRequestList />
      </div>
    </>
  );
};

export default AdminPage;
