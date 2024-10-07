
import React, { useEffect } from "react";

import { Avatar, Button, Col, Flex, message, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { getLyricFileByUserId } from "@/entities/lyricFile";
import { LyricFileItem } from "@/entities/lyricFile/ui/LyricFileItem";
import { createPublicationRequest } from "@/entities/publicationRequest";
import { useState } from 'react';

import { Avatar, Button, Col, Flex, Typography } from 'antd';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

import { ProfileUpdateForm } from '@/entities/user/ui/ProfileUpdateForm';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { lyricFiles } = useAppSelector((state) => state.lyricFileList);
  const dispatch = useAppDispatch();
  const [activeButton, setActiveButton] = React.useState(true);

  const handleRequestPasswordReset = async () => {
    try {
      await axiosInstance.post("/auth/request-reset-password", {
        email: user?.email,
      });
      message.success("Ссылка для сброса пароля отправлена на ваш email");
    } catch (error) {
      console.log(error);

      message.error("Ошибка при запросе сброса пароля");
    }
  };

  const getUserFiles = async () => {
    await dispatch(getLyricFileByUserId());
  };

  const handleSetPublic = async (lyricFileId: number) => {
    dispatch(createPublicationRequest({lyricFileId}));
    setActiveButton(false);
  };

  useEffect(() => {
    getUserFiles();
  }, []);
  
  const [active, setActive] = useState(false)

  const isActive = () => {
    setActive(prev => !prev)
  }
  
  return (
    <div style={{ padding: '20px', width: '70vw'}}>
      <Flex justify="space-evenly" align="middle" gap='40' >
        <Col style={{margin: "70px"}}>
          <Avatar size={169} style={{backgroundColor: '#fe9fad', verticalAlign: 'middle', fontSize: '50px', textShadow: 'unset', marginBottom: '50px'}}>
          {user?.username ? user.username.charAt(0).toUpperCase() : '-'}
          </Avatar>
        </Col>
        <Col style={{marginTop: "50px" } }>
          <Title level={3} className='column'>Имя:</Title>
          <Text style={{fontSize: "20px"}}>{user?.username}</Text>
          <br />
          <Title level={3} className='column'>Email:</Title>
          <Text style={{fontSize: "20px"}}>{user?.email}</Text>
          <br />
          {!active ? ( <Button type="primary" onClick={isActive} style={{marginTop: '20px'}}>
            Изменить данные
          </Button>) : ( <ProfileUpdateForm isActive={isActive}/>)}
         
         
         
        </Col>
      </Flex>
      {lyricFiles && <div style={{ marginTop: "40px" }}>
        {/* <Title level={4}>Мои файлы</Title>
        {userFiles.map((file, index) => (
          <Card key={index} style={{ marginBottom: '10px' }}>
            <Row justify="space-between" align="middle">
              <Text>{file.name}</Text>
              <Button type="link" href={file.link}>
                Перейти
              </Button>
            </Row>
          </Card>
        ))} */}
        <Title>Мои файлы</Title>
        {lyricFiles?.map((lyricFile) => (
          <div>
          <LyricFileItem key={lyricFile.id} lyricFile={lyricFile} />
          {!lyricFile.public && activeButton && <button onClick={() => handleSetPublic(lyricFile.id)}>Сделать публичным</button>}
          {!activeButton && <h2>Заявка на публикацию была отправлена ✔️</h2>}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default ProfilePage;
