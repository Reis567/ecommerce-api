import styled from 'styled-components';
import { Button } from 'antd';




export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const ListaVendas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Venda = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

export const Imagem = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
`;

export const Detalhes = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NumeroVenda = styled.h2`
  font-size: 18px;
  margin: 0;
`;

export const NomeProduto = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

export const Status = styled.span`
  font-size: 14px;
  color: #555;
`;

export const NotaFiscalButton = styled(Button)`
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
