import styled from 'styled-components';
import { Button } from 'antd';

export const ComprasContent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  padding: 20px;
  width: 65%;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 28px;
  font-size: 50px;
`;

export const ListaCompras = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Compra = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 10px;
  height: 300px;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const NumeroCompra = styled.h2`
  font-size: 26px;
  margin: 0;
`;

export const ValorCP = styled.p`
  font-size: 26px;
  margin: 5px 0;
`;

export const Status = styled.span`

  color: #555;
  font-size: 28px;
  font-weight: bolder;
`;

export const NotaFiscalButton = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  font-size: 20px;
  &:hover {
    background-color: #2a7b7b;
  }
`;

export const Acoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`;
export const BackButton = styled(Button)`
  background-color: #239271; 
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;