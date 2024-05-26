import React from 'react';
import {
  Compra,
  Container,
  Header,
  Imagem,
  ListaCompras,
  ValorCP,
  NumeroCompra,
  Status,
  ComprasContent,
  NotaFiscalButton,
  Informacoes,
  Acoes
} from './index.styles';

const ComprasUsuario: React.FC = () => {
  const compras = [
    {
      numero: '12345',
      produto: 'Produto A',
      imagem: 'https://via.placeholder.com/150',
      valor: '100,00',
      status: 'Enviado'
    },
    {
      numero: '12346',
      produto: 'Produto B',
      imagem: 'https://via.placeholder.com/150',
      valor: '150,00',
      status: 'Em Processamento'
    }
  ];

  return (
    <ComprasContent>
      <Container>
        <Header>Minhas Compras</Header>
        <ListaCompras>
          {compras.map((compra, index) => (
            <Compra key={index}>
              <Informacoes>
                <NumeroCompra>#{compra.numero}</NumeroCompra>
                <Imagem src={compra.imagem} alt={compra.produto} />
                <ValorCP>R$ {compra.valor}</ValorCP>
              </Informacoes>
              <Acoes>
                <NotaFiscalButton>Nota Fiscal</NotaFiscalButton>
                <Status>{compra.status}</Status>
              </Acoes>
            </Compra>
          ))}
        </ListaCompras>
      </Container>
    </ComprasContent>
  );
};

export default ComprasUsuario;
