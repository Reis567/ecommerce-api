import React from 'react';
import styled from 'styled-components';

const VendasVendedor: React.FC = () => {
  const vendas = [
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
      <Header>Minhas Vendas</Header>
      <ListaVendas>
        {vendas.map((venda, index) => (
          <Venda key={index}>
            <Imagem src={venda.imagem} alt={venda.produto} />
            <Detalhes>
              <NumeroVenda>Venda: {venda.numero}</NumeroVenda>
              <NomeProduto>{venda.produto}</NomeProduto>
              <Status>{venda.status}</Status>
            </Detalhes>
            <NotaFiscalButton>Nota Fiscal</NotaFiscalButton>
          </Venda>
        ))}
      </ListaVendas>
    </Container>
  );
};

export default VendasVendedor;

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ListaVendas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Venda = styled.div`
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

const NumeroVenda = styled.h2`
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

const NotaFiscalButton = styled.button`
  background-color: #239271;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1e8266;
  }
`;
