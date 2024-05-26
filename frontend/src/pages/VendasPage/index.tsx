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
  Acoes,
  BackButton
} from './index.styles';
import { useNavigate } from 'react-router-dom';



const VendasVendedor: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };
  const vendas = [
    {
      numero: '54321',
      produto: 'Produto C',
      imagem: 'https://via.placeholder.com/150',
      valor: '200,00',
      status: 'Entregue'
    },
    {
      numero: '54322',
      produto: 'Produto D',
      imagem: 'https://via.placeholder.com/150',
      valor: '250,00',
      status: 'Aguardando Pagamento'
    }
  ];

  return (
    <ComprasContent>
      
      <Container>
      <BackButton onClick={handleBackClick}>Voltar</BackButton>
        <Header>Minhas Vendas</Header>
        <ListaCompras>
          {vendas.map((venda, index) => (
            <Compra key={index}>
              <Informacoes>
                <NumeroCompra>#{venda.numero}</NumeroCompra>
                <Imagem src={venda.imagem} alt={venda.produto} />
                <ValorCP>R$ {venda.valor}</ValorCP>
              </Informacoes>
              <Acoes>
                <NotaFiscalButton>Nota Fiscal</NotaFiscalButton>
                <Status>{venda.status}</Status>
              </Acoes>
            </Compra>
          ))}
        </ListaCompras>
      </Container>
    </ComprasContent>
  );
};

export default VendasVendedor;
