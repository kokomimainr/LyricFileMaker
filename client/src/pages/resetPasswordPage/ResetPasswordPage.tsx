import { useState } from 'react';
import { Button, Input, message, Form, Typography, Space, Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/shared/lib/axiosInstance';

const { Title } = Typography;

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [comparedNewPassword, setComparedNewPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      if (newPassword === comparedNewPassword) {
        const response = await axiosInstance.post('/auth/reset-password', { token, newPassword });
        console.log(response);
        message.success('Пароль успешно сброшен!');
        navigate('/profile');
      } else {
        message.error('Пароли не совпадают');
      }
    } catch (error) {
      message.error('Ошибка при сбросе пароля');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ maxWidth: 400, padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Сброс пароля</Title>
        <Form
          name='reset-password'
          layout='vertical'
          onFinish={handleResetPassword}
        >
          <Form.Item
            label="Введите новый пароль"
            name="newPassword"
            rules={[{ required: true, message: 'Введите новый пароль' },
              {
                min: 6,
                message: "Пароль должен содержать минимум 6 символов!",
              },
            ]}
          >
            <Input.Password
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Подтвердите пароль"
            name="confirmPassword"
            rules={[{ required: true, message: 'Подтвердите пароль' },
              {
                min: 6,
                message: "Пароль должен содержать минимум 6 символов!",
              },
            ]}
          >
            <Input.Password
              placeholder="Подтверждение пароля"
              value={comparedNewPassword}
              onChange={(e) => setComparedNewPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Сбросить пароль
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
