import React, { useEffect, useState } from 'react';
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

interface Compra {
  id: number;
  customer: number;
  order_time: string;
  status: string;
  total: string;
  produtos: { nome: string; imagem: string }[];
}

const ComprasUsuario: React.FC = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const customerId = 1; // Defina o customer_id conforme necessário ou obtenha de algum lugar (ex: auth, params)

  // Função para buscar compras do cliente na API
  const fetchCompras = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/customer/orders/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Supondo que o token esteja no localStorage
        }
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar compras');
      }
      const data = await response.json();
      setCompras(data); // Atualiza o estado com os dados das compras
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    fetchCompras(); // Faz o fetch das compras quando o componente é montado
  }, []);

  return (
    <ComprasContent>
      <Container>
        <Header>Minhas Compras</Header>
        <ListaCompras>
          {compras.map((compra, index) => (
            <Compra key={index}>
              <Informacoes>
                <NumeroCompra>Pedido #{compra.id}</NumeroCompra>
                {compra.produtos.map((produto, idx) => (
                  <React.Fragment key={idx}>
                    <Imagem src={produto.imagem || 'https://via.placeholder.com/150'} alt={produto.nome} />
                  </React.Fragment>
                ))}
                <ValorCP>R$ {compra.total}</ValorCP>
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
