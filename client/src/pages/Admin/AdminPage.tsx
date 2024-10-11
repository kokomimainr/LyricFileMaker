import React, { useEffect } from "react";
import { Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { ROUTES } from "@/app/router/routes";
import { refreshAccessToken } from "@/entities/user";
import PublicationRequestList from "@/widget/PublicationRequestList/PublicationRequestList";

const { Title } = Typography;

export const AdminPage: React.FC = () => {
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
    <Card style={{ margin: "20px", padding: "20px", borderRadius: "10px" }}>
      <Title level={2}>Админ панель</Title>
      <PublicationRequestList />
    </Card>
  );
};

export default AdminPage;
