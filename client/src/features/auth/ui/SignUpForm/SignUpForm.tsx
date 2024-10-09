import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/entities/user';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROUTES } from '@/app/router/routes';
import { checkEmailExists } from '@/shared/utils/checkEmailExists';
import "./SignUpForm.css";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
};

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish: FormProps<SignUpFormData>["onFinish"] = async (
    values: SignUpFormData
  ) => {
    try {
        const emailExists = await checkEmailExists(values.email);
        if (emailExists) {

          const resultAction = await dispatch(signUp(values));
          unwrapResult(resultAction);
          navigate(ROUTES.HOME);

          
        } else {
          message.error('Email не существует. Пожалуйста, введите действительный адрес электронной почты.');
          return;
        }
     
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="regText">Регистрация </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<SignUpFormData>
          label="Имя"
          name="username"
          hasFeedback
          rules={[{ required: true, message: "Пожалуйста, введите свое имя!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<SignUpFormData>
          label="Email"
          name="email"
          validateDebounce={500}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите свой адрес электронной почты!",
            },
            {
              type: "email",
              message: "Введенный адрес электронной почты не валиден!!!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpFormData>
          label="Пароль"
          name="password"
          hasFeedback
          tooltip={<span>Пожалуйста, введите свой пароль</span>}
          validateDebounce={1000}
          rules={[
            { required: true, message: "Пожалуйста, введите свой пароль!" },
            {
              min: 6,
              message: "Пароль должен содержать минимум 6 символов!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="button-reg">
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpForm;
