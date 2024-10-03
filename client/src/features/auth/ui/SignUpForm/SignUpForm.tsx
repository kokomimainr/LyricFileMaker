import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {
  selectUserLoading,
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/entities/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROUTES } from '@/app/router/routes';
import styles from './SignUpForm.module.css'

type SignUpFormData  = {
  username: string;
  email: string;
  password: string;
};

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectUserLoading);

  const onFinish: FormProps<SignUpFormData>['onFinish'] = async (
    values: SignUpFormData
  ) => {
    try {
      const resultAction = await dispatch(signUp(values));
      unwrapResult(resultAction);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Регистрация </h1>
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete='off'
    >
       <Form.Item<SignUpFormData>
        label='Имя'
        name='username'
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, введите свое имя!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<SignUpFormData>
        label='Email'
        name='email'
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, введите свой адрес электронной почты!' },
          { type: 'email', message: 'Введенный адрес электронной почты не валиден!!!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignUpFormData>
        label='Пароль'
        name='password'
        
        hasFeedback
        tooltip={<span>Пожалуйста, введите свой пароль</span>}
        validateDebounce={1000}
        rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' },
          {
            min: 6,
            message: 'Пароль должен содержать минимум 6 символов!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
        Регистрация
        </Button>
       
      </Form.Item>
     
    </Form>
    </div>
    </div>
  );
};

export default SignUpForm;
