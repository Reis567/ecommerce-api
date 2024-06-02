import React from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, AuthForm, AuthTitle, AuthButton } from './index.styles';

const RegistroCliente: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,  // Assuming username is email
          password: values.password,
          email: values.email,
          first_name: values.name,
          last_name: values.last_name
        }),
      });

      if (response.ok) {
        navigate('/login'); // Redireciona para a página de login do cliente
      } else {
        const errorData = await response.json();
        console.error('Failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
        <AuthTitle>Registro</AuthTitle>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[{ required: true, message: 'Por favor, insira seu sobrenome!' }]}
        >
          <Input placeholder="Sobrenome" />
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
