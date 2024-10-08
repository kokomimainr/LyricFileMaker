import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Row,
  message,
  Typography,
  Card,
  Space,
  Modal,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { getLyricFileByUserId } from "@/entities/lyricFile";
import { ProfileUpdateForm } from "@/entities/user/ui/ProfileUpdateForm";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import {
  createPublicationRequest,
  getAllPublicationRequests,
} from "@/entities/publicationRequest";
import { getPublicationRequestsByUserId } from "@/entities/publicationRequest/model/PublicationRequestThunk";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { lyricFiles } = useAppSelector((state) => state.lyricFileList);
  const { publicationRequests } = useAppSelector(
    (state) => state.publicationRequestList
  );
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Управляем модальным окном
  const [activeButton, setActiveButton] = useState(true);

  const navigate = useNavigate();

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
    const publ = await dispatch(getPublicationRequestsByUserId());
  };

  const handleSetPublic = async (lyricFileId: number) => {
    await dispatch(createPublicationRequest({ lyricFileId }));
  };

  useEffect(() => {
    getUserFiles();
    getUserPublicationRequests();
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              size={169}
              style={{
                backgroundColor: "#fe9fad",
                fontSize: "50px",
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
                <Button type="primary" onClick={showModal}>
                  Изменить данные
                </Button>
                <Button onClick={handleRequestPasswordReset}>
                  Сбросить пароль
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      <Modal
        title="Редактирование профиля"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose // Удаляем форму при закрытии модального окна
      >
        <ProfileUpdateForm isActive={closeModal} />
      </Modal>

      {lyricFiles && lyricFiles.length > 0 && (
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
                  {!lyricFile.public &&
                    publicationRequests &&
                    (publicationRequests.some(
                      (request) => request.lyricFileId === lyricFile.id
                    ) ? (
                      <Text type="success">
                        Заявка на публикацию отправлена
                      </Text>
                    ) : (
                      <Button
                        type="primary"
                        block
                        style={{ marginTop: "10px" }}
                        onClick={() => handleSetPublic(lyricFile.id)}
                      >
                        Сделать публичным
                      </Button>
                    ))}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
