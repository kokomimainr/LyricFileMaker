import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Row, message, Typography, Card, Grid, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { getLyricFileByUserId } from "@/entities/lyricFile";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import { createPublicationRequest, getAllPublicationRequests } from "@/entities/publicationRequest";
import { useState } from "react";
import { ProfileUpdateForm } from "@/entities/user/ui/ProfileUpdateForm";
import { getPublicationRequestsByUserId } from "@/entities/publicationRequest/model/PublicationRequestThunk";
import './ProfilePage.css';
import { useNavigate } from "react-router-dom";


const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { lyricFiles } = useAppSelector((state) => state.lyricFileList);
  const { publicationRequests } = useAppSelector(
    (state) => state.publicationRequestList
  );
  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = useState(true);
  const [active, setActive] = useState(false);
  const screens = useBreakpoint();


  const handleRequestPasswordReset = async () => {
    try {
      await axiosInstance.post("/auth/request-reset-password", {
        email: user?.email,
      });
      message.success("Ссылка для сброса пароля отправлена на ваш email");
    } catch (error) {
      console.error(error);
      message.error("Ошибка при запросе сброса пароля");
    }
  };

  const getUserFiles = async () => {
    await dispatch(getLyricFileByUserId());
  };

  const getUserPublicationRequests = async () => {
    await dispatch(getPublicationRequestsByUserId());
  };

  const handleSetPublic = async (lyricFileId: number) => {
    await dispatch(createPublicationRequest({ lyricFileId }));
  };

  useEffect(() => {
    getUserFiles();
    getUserPublicationRequests();
  }, [dispatch]);


  const isActive = () => {
    setActive((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className="profile-page-container">
      <Card
        style={{
          padding: "20px",
          maxWidth: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <Avatar
              size={screens.md ? 169 : 100}
              style={{
                backgroundColor: "#fe9fad",
                fontSize: screens.md ? "50px" : "30px",
                marginBottom: "20px",
              }}
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "-"}
            </Avatar>
          </Col>
          <Col xs={24} md={16}>
            <Space direction="vertical" size="middle">
              <Title level={3}>Имя:</Title>
              <Text style={{ fontSize: "20px" }}>{user?.username}</Text>
              <Title level={3}>Email:</Title>
              <Text style={{ fontSize: "20px" }}>{user?.email}</Text>
              <div className="button-profile">
                {!active ? (
                  <Button type="primary" onClick={isActive}>
                    Изменить данные
                  </Button>
                ) : (
                  <ProfileUpdateForm isActive={isActive} />
                )}
                <Button onClick={handleRequestPasswordReset}>
                  Сбросить пароль
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      {lyricFiles && lyricFiles.length > 0 && !user?.isAdmin && (
        <div className="files-section">
          <Title level={4}>Мои файлы</Title>
          <Row gutter={[16, 16]} justify="center">
            {lyricFiles?.map((lyricFile) => (
              <Col xs={24} sm={12} md={8} lg={6} key={lyricFile.id}>
                <Card
                  hoverable
                  className="lyric-file-card"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <Title
                    level={5}
                    className="lyric-file-title"
                    onClick={() => navigate(`/lyric-file-card/${lyricFile.id}`)}
                  >
                    {lyricFile.trackName}
                  </Title>
                  <Button
                    type="default"
                    block
                    style={{ marginTop: "10px" }}
                    onClick={() => navigate(`/lyric-file-card/${lyricFile.id}`)}
                  >
                    Перейти
                  </Button>
                  {!lyricFile.public && activeButton && (
                    <Button
                      type="primary"
                      block
                      style={{ marginTop: "10px" }}
                      onClick={() => handleSetPublic(lyricFile.id)}
                    >
                      Сделать публичным
                    </Button>
                  )}
                  {!activeButton && (
                    <Text type="success">
                      Заявка на публикацию отправлена 
                    </Text>
                  )}
                </Card>
              </Col>
              {!lyricFile.public &&
                  publicationRequests &&
                  publicationRequests.length > 0 &&
                  (publicationRequests.some(
                    (request) => request.lyricFileId === lyricFile.id
                  ) ? (
                    <p>Ваша заявка на публикацию отправлена ✔️</p>
                  ) : (
                    <button onClick={() => handleSetPublic(lyricFile.id)}>
                      Сделать публичным
                    </button>
                  ))}
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
