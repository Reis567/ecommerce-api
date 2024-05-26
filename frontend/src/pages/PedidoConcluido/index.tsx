import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, IconContainer, SuccessIcon, Message, HomeButton } from './index.styles';

const PedidoConcluido: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconContainer>
        <SuccessIcon>✔</SuccessIcon>
      </IconContainer>
      <Message>Pedido Concluído com Sucesso!</Message>
      <HomeButton onClick={() => navigate('/')}>Voltar para Home</HomeButton>
    </Container>
  );
};

export default PedidoConcluido;
