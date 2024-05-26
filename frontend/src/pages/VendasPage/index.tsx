import React from 'react';

import {
Container,
Detalhes,
Header,
Imagem,
ListaVendas,
NomeProduto,
NotaFiscalButton,
NumeroVenda,
Status,
Venda,


} from './index.styles'


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
