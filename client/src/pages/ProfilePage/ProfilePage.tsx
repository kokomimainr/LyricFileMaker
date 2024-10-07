import React, { useState } from 'react';

import { Avatar, Button, Col, Flex, Typography } from 'antd';
import { useAppSelector } from '@/shared/hooks/reduxHooks';

import { ProfileUpdateForm } from '@/entities/user/ui/ProfileUpdateForm';

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const {user } = useAppSelector(state => state.user)
  
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

    
    </div>
  );
};

export default ProfilePage;
