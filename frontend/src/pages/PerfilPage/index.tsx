import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Header, InfoSection, InfoHeader, InfoContent, EditButton, AddButton, UserImage, Content, BackButton } from './index.styles';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken'); // Ajuste para obter o token do localStorage
      if (!token) {
        setError('Usuário não autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Content>
      <Header>Perfil do Usuário</Header>
      <Container>
        <InfoSection>
          <InfoHeader>
            <h2>Dados Pessoais</h2>
            <EditButton>Editar</EditButton>
          </InfoHeader>
          <InfoContent>
            <UserImage src={user.photo || 'https://via.placeholder.com/150'} alt={`${user.first_name} ${user.last_name}`} />
            <p><strong>Nome:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefone:</strong> {user.phone}</p>
          </InfoContent>
        </InfoSection>
        <InfoSection>
          <InfoHeader>
            <h2>Endereço Principal</h2>
            <EditButton>Editar</EditButton>
          </InfoHeader>
          <InfoContent>
            <p><strong>Rua:</strong> </p>
            <p><strong>Cidade:</strong></p>
            <p><strong>Estado:</strong></p>
            <p><strong>CEP:</strong></p>
          </InfoContent>
          <AddButton>Adicionar Novo Endereço</AddButton>
        </InfoSection>
      </Container>
    </Content>
  );
};

export default ProfilePage;
