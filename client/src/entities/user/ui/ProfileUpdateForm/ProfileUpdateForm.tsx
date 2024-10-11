import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message, Upload } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./ProfileUpdateForm.module.css";
import { checkEmailExists } from "@/shared/utils/checkEmailExists";
import { updateUser } from "../../model/userThunks";
import { UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";

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
            beforeUpload={() => {
              return false; // Предотвращаем автоматическую загрузку
            }}
            onChange={(info) => {
              if (info.fileList.length > 0) {
                const file = info.fileList[0];
                form.setFieldsValue({ avatar: file });
                message.success(`${file.name} успешно загружен!`);
                // Устанавливаем файл в состояние формы
              } else {
                form.setFieldsValue({ avatar: undefined }); // Очищаем значение, если файл удален
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdateForm;
