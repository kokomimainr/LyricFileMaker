import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {
  selectUserLoading,
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/entities/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROUTES } from '@/app/router/routes';

type SignInFormData  = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectUserLoading);

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
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not a valid email!!!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<SignInFormData>
        label='Password'
        name='password'
        hasFeedback
        help={<p>Ну тв че, не понял? </p>}
        tooltip={<span>Ну тв че, не понял? </span>}
        validateDebounce={1000}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
