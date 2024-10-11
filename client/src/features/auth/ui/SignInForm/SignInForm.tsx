import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Modal } from "antd";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/entities/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { ROUTES } from "@/app/router/routes";
import "./SignInForm.css";
import { axiosInstance } from "@/shared/lib/axiosInstance";

type SignInFormData = {
  email: string;
  password: string;
};

type ResetFormData= {
  email: string;
}

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish: FormProps<SignInFormData>["onFinish"] = async (
    values: SignInFormData
  ) => {
    try {
      const resultAction = await dispatch(signIn(values));
      unwrapResult(resultAction);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  const onResetPass: FormProps<ResetFormData>["onFinish"] = async (
    values: ResetFormData
  ) => {
    try {
          await axiosInstance.post("/auth/request-reset-password", {
            email: values.email,
          });
          message.success("Ссылка для сброса пароля отправлена на ваш email");
        } catch (error) {
          console.error(error);
          message.error("Ошибка при запросе сброса пароля");
        }
      };
  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRegistration = async () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <div className="container">
      <h1 className="regText">Авторизация</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<SignInFormData>
          label="Email"
          name="email"
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

        <Form.Item<SignInFormData>
          label="Пароль"
          name="password"
          hasFeedback
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
        <a onClick={handleRegistration} style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
          Впервые у нас?
        </a>
        <a onClick={showModal} style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
          Забыли пароль?
        </a>
        { <Modal
        title="Сброс пароля"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose // Удаляем форму при закрытии модального окна
      >
         <div className="container">
      <h2 className="regText">Введите свой адрес электронной почты, чтобы сбросить пароль</h2>
      <br/>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onResetPass}
        autoComplete="off"
      >
        <Form.Item<SignInFormData>
          label="Email"
          name="email"
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
        <Form.Item className="button-reg">
          <Button type="primary" htmlType="submit">
            Сбросить пароль
          </Button>
        </Form.Item>
        </Form>
        </div>
      </Modal>}

        <Form.Item className="button-reg">
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
