import React from 'react';
import { Avatar, Button, Col, Flex, Typography } from 'antd';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const {user} = useAppSelector(state => state.user)
  return (
    <div style={{ padding: '20px', width: '70vw'}}>
      <Flex justify="space-evenly" align="middle" gap='40'>
        <Col style={{margin: "70px"}}>
          <Avatar size={169} style={{backgroundColor: '#fe9fad', verticalAlign: 'middle', fontSize: '50px', textShadow: 'unset' }}>
          {user?.username ? user.username.charAt(0).toUpperCase() : '-'}
          </Avatar>
        </Col>
        <Col style={{margin: "20px" }}>
          <Title level={1}>Имя:</Title>
          <Text style={{fontSize: "20px"}}>{user?.username}</Text>
          <br />
          <Title level={1}>Email:</Title>
          <Text style={{fontSize: "20px"}}>{user?.email}</Text>
          <br />
          <Button type="primary" style={{ marginTop: '30px', padding: '20px', fontSize: '20px'}}>
            Изменить данные
          </Button>
        </Col>
      </Flex>

      <div style={{ marginTop: '40px' }}>
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
      </div>
    </div>
  );
};

export default ProfilePage;
