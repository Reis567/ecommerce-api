import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, AuthForm, AuthTitle, AuthButton } from './index.styles';

const LoginVendedor: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/'); // Redireciona para a página inicial ou qualquer outra página
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthContainer>
      <AuthForm
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <AuthTitle>Login Vendedor</AuthTitle>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
        >
          <Input.Password placeholder="Senha" />
        </Form.Item>

        <Form.Item>
          <AuthButton type="primary" htmlType="submit">
            Entrar
          </AuthButton>
        </Form.Item>
      </AuthForm>
    </AuthContainer>
  );
};

export default LoginVendedor;
