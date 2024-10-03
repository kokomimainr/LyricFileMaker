import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {
  useAppDispatch,
} from '@/shared/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/entities/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROUTES } from '@/app/router/routes';
import styles from './SignInFprm.module.css'

type SignInFormData  = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  

  const onFinish: FormProps<SignInFormData>['onFinish'] = async (
    values: SignInFormData
  ) => {
    try {
      const resultAction = await dispatch(signIn(values));
      unwrapResult(resultAction);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
    <h1>Авторизация</h1>
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item<SignInFormData>
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

      <Form.Item<SignInFormData>
        label='Пароль'
        name='password'
        hasFeedback
        tooltip={<span>Пожалуйста, введите свой пароль</span>}
        validateDebounce={1000}
        rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' },  {
          min: 6,
          message: 'Пароль должен содержать минимум 6 символов!',
        },]
      }
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
        Войти
        </Button>
      </Form.Item>
    </Form>
   </div>
   </div>
  );
};

export default SignInForm;
