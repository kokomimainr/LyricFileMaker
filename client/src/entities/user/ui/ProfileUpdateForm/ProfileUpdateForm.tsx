import React, { useState } from "react";
import type { FormProps } from "antd";
import { Avatar, Button, Form, Input, message, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./ProfileUpdateForm.module.css";
import { checkEmailExists } from "@/shared/utils/checkEmailExists";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { updateUser } from "../../model/userThunks";
import { UploadChangeParam } from "antd/es/upload";

export type UpdateFormData = {
  username: string;
  email: string;
  id: number;
  avatar: UploadChangeParam; // Добавляем поле для аватара
};

type UpdateFormProps = {
  isActive: () => void;
};

export const ProfileUpdateForm: React.FC<UpdateFormProps> = ({ isActive }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleRequestPasswordReset = async () => {
    try {
      await axiosInstance.post("/auth/request-reset-password", {
        email: user?.email,
      });
      message.success("Инструкция по сбросу пароля отправлена на ваш email!");
    } catch (error) {
      console.error(error);
      message.error("Ошибка при запросе сброса пароля");
    }
  };

  const onFinish: FormProps<UpdateFormData>["onFinish"] = async (
    values: UpdateFormData
  ) => {
    try {
      const emailExists = await checkEmailExists(values.email);
      if (!emailExists) {
        message.error("Email does not exist. Please enter a valid email.");
        return;
      }

      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      if (values.avatar) {
        formData.append(
          "avatar",
          values.avatar.fileList[0].originFileObj as File
        ); // Убедитесь, что имя поля совпадает
      }
      const resultAction = await dispatch(updateUser(formData));
      unwrapResult(resultAction);
      isActive();
    } catch (error) {
      console.error("Update user failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          username: user?.username,
          email: user?.email,
        }}
      >
        <Form.Item<UpdateFormData>
          label="Имя"
          name="username"
          hasFeedback
          rules={[{ required: true, message: "Пожалуйста, введите свое имя!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UpdateFormData>
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

        <Form.Item<UpdateFormData> label="Аватар" name="avatar">
          <Upload
            accept=".jpeg,.jpg,.png" // Ограничение на типы файлов
            showUploadList={false}
            beforeUpload={(file) => {
              return false; // Предотвращаем автоматическую загрузку
            }}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                const file = info.fileList[0];
                form.setFieldsValue({ avatar: file }); // Устанавливаем файл в состояние формы
              } else {
                form.setFieldsValue({ avatar: undefined }); // Очищаем значение, если файл удален
              }
            }}
          >
            <Button>Загрузить аватар</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          htmlType="button"
          style={{ margin: "20px", marginLeft: "78px" }}
          onClick={handleRequestPasswordReset}
        >
          Изменить пароль
        </Button>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
