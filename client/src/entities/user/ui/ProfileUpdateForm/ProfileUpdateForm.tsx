import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/reduxHooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { checkEmailExists } from '@/shared/utils/checkEmailExists';
import { axiosInstance } from '@/shared/lib/axiosInstance';
import { updateUser } from '../../model/userThunks';

type UpdateFormData  = {
  username: string;
  email: string;
  id: number;
  
};

type UpdateFormProps = {
    isActive: () => void
}

export const ProfileUpdateForm: React.FC<UpdateFormProps> = ({isActive}) => {
  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();


  const onFinish: FormProps<UpdateFormData>['onFinish'] = async (
    values: UpdateFormData
  ) => {
    try {
        if(user)   values.id = user?.id
  
        const emailExists = await checkEmailExists(values.email);
        if (!emailExists) {
          message.error('Email does not exist. Please enter a valid email.');
          return;
        }
      const resultAction = await dispatch(updateUser(values));
      unwrapResult(resultAction);
      isActive()

    } catch (error) {
      console.error('Update user failed:', error);
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
      initialValues={{
        username: user?.username, // Предыдущее имя
        email: user?.email, // Предыдущий email
      }}
    >
       <Form.Item<UpdateFormData>
        label=' Имя'
        name='username'
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, введите свое имя!' },
        ]}
        
      >
        <Input />
      </Form.Item>
      <Form.Item<UpdateFormData>
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
       Сохранить
        </Button>
       
      </Form.Item>
     
    </Form>
  );
};

export default ProfileUpdateForm;
