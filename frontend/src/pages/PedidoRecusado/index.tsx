import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, IconContainer, ErrorIcon, Message, RetryButton } from './index.styles';

const PedidoRecusado: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <IconContainer>
        <ErrorIcon>✖</ErrorIcon>
      </IconContainer>
      <Message>Pedido Recusado!</Message>
      <RetryButton onClick={() => navigate('/')}>Tentar Novamente</RetryButton>
    </Container>
  );
};

export default PedidoRecusado;
