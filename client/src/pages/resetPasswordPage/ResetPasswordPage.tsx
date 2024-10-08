import  { useState } from 'react';
import { Button, Input, message, Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/shared/lib/axiosInstance';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [comparedNewPassword, setComparedNewPassword] = useState('');
    const navigate = useNavigate()

    const handleResetPassword = async () => {
        try {
            if(newPassword === comparedNewPassword){
                await axiosInstance.post('/auth/reset-password', { token, newPassword });
                message.success('Пароль успешно сброшен!');
                navigate('/profile')
            } else {
                message.error('Пароли не совпадают') 
            }
          
        } catch (error) {
            
            message.error('Ошибка при сбросе пароля');
        }
    };

    return (
        <div>
            <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete='off'>
            <h2>Сброс пароля</h2>
            <Input.Password
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            /> <Input.Password
            placeholder="Подтвердите пароль"
            value={comparedNewPassword}
            onChange={(e) => setComparedNewPassword(e.target.value)}
        />
            <Button type="primary" onClick={handleResetPassword}>
                Сбросить пароль
            </Button>
            </Form>
        </div>
    );
};

export default ResetPasswordPage;
