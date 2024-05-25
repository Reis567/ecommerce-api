import React from 'react';
import styled from 'styled-components';

const ComprasUsuario: React.FC = () => {
  const compras = [
    {
      numero: '12345',
      produto: 'Produto A',
      imagem: 'https://via.placeholder.com/150',
      status: 'Enviado'
    },
    {
      numero: '12346',
      produto: 'Produto B',
      imagem: 'https://via.placeholder.com/150',
      status: 'Em Processamento'
    }
  ];

  return (
    <Container>
      <Header>Minhas Compras</Header>
      <ListaCompras>
        {compras.map((compra, index) => (
          <Compra key={index}>
            <Imagem src={compra.imagem} alt={compra.produto} />
            <Detalhes>
              <NumeroCompra>Compra: {compra.numero}</NumeroCompra>
              <NomeProduto>{compra.produto}</NomeProduto>
              <Status>{compra.status}</Status>
            </Detalhes>
          </Compra>
        ))}
      </ListaCompras>
    </Container>
  );
};

export default ComprasUsuario;

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ListaCompras = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Compra = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Imagem = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

const Detalhes = styled.div`
  display: flex;
  flex-direction: column;
`;

const NumeroCompra = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const NomeProduto = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const Status = styled.span`
  font-size: 14px;
  color: #555;
`;
