import React from 'react';
import {
Compra,
Container,
Detalhes,
Header,
Imagem,
ListaCompras,
NomeProduto,
NumeroCompra,
Status,
ComprasContent,
NotaFiscalButton

} from './index.styles'



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
    <ComprasContent>
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
                <NotaFiscalButton>Nota fiscal</NotaFiscalButton>
              </Compra>
            ))}
          </ListaCompras>
        </Container>
    </ComprasContent>

  );
};

export default ComprasUsuario;

