import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header, Form, Input, AntdButton, Content,BackButton } from './index.styles';

const UpdatePasswordPage: React.FC = () => {
    const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para atualizar a senha
    console.log('Senha atual:', currentPassword);
    console.log('Nova senha:', newPassword);
    console.log('Confirmação da nova senha:', confirmNewPassword);
  };

  return (
    <Content>
      <BackButton onClick={() => navigate(-1)}>Voltar</BackButton>
      <Header>Atualizar Senha</Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Senha Atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Repetir Nova Senha"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <AntdButton>
            <button type="submit">Atualizar Senha</button>
          </AntdButton>
        </Form>
      </Container>
    </Content>
  );
};

export default UpdatePasswordPage;
