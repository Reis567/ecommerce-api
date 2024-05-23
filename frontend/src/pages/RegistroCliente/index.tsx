import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, AuthForm, AuthTitle, AuthButton } from './index.styles';

const RegistroCliente: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/login-cliente'); // Redireciona para a página de login do cliente
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthContainer>
      <AuthForm
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <AuthTitle>Registro Cliente</AuthTitle>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>

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
            Registrar
          </AuthButton>
        </Form.Item>
      </AuthForm>
    </AuthContainer>
  );
};

export default RegistroCliente;
