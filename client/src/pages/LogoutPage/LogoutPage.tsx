import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { logout } from '@/entities/user';
import styles from './Logout.module.css';

const LogoutPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <p className={styles.text}>Вы действительно хотите выйти?</p>
            <div className={styles.buttonContainer}>
              <Button type="primary" danger size="large" onClick={() => {dispatch(logout())
                navigate('/')
              }}>
                Да
              </Button>
              <Button type="default" onClick={() => {navigate('/')}} className={styles.cancelButton} size="large">
                Нет
              </Button>
            </div>
          </div>
        </div>
      );
    };
    
   


export default LogoutPage;