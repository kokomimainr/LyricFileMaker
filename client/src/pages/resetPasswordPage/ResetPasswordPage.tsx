import { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '@/shared/lib/axiosInstance';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            await axiosInstance.post('/auth/reset-password', { token, newPassword });
            message.success('Пароль успешно сброшен!');
        } catch (error) {
            
            message.error('Ошибка при сбросе пароля');
        }
    };

    return (
        <div>
            <h2>Сброс пароля</h2>
            <Input.Password
                placeholder="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="primary" onClick={handleResetPassword}>
                Сбросить пароль
            </Button>
        </div>
    );
};

export default ResetPasswordPage;
