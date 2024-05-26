import React from 'react';
import { Container, Header, InfoSection, InfoHeader, InfoContent, EditButton, AddButton, UserImage } from './index.styles';

const ProfilePage: React.FC = () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    photo: 'https://via.placeholder.com/150',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
  };

  return (
    <Container>
      <Header>Perfil do Usuário</Header>
      <InfoSection>
        <InfoHeader>
          <h2>Dados Pessoais</h2>
          <EditButton>Editar</EditButton>
        </InfoHeader>
        <InfoContent>
          <UserImage src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
          <p><strong>Nome:</strong> {user.firstName} {user.lastName}</p>
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
          <p><strong>Rua:</strong> {user.address.street}</p>
          <p><strong>Cidade:</strong> {user.address.city}</p>
          <p><strong>Estado:</strong> {user.address.state}</p>
          <p><strong>CEP:</strong> {user.address.zip}</p>
        </InfoContent>
        <AddButton>Adicionar Novo Endereço</AddButton>
      </InfoSection>
    </Container>
  );
};

export default ProfilePage;
