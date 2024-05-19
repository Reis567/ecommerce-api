import styled from 'styled-components';
import { Button } from 'antd';

export const CheckoutContent = styled.div`
    width: 100%;
    min-height: 100vh;
`

export const CheckoutContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CheckoutTitle = styled.h1`
  margin-bottom: 20px;
`;

export const CheckoutTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`;

export const ProductCell = styled.td`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

export const ProductName = styled.span`
  font-size: 16px;
`;

export const CheckoutButton = styled(Button)`
  margin: 10px;
  background-color: #239271;
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;

export const BackButton = styled(Button)`
  margin: 10px;
  background-color: #239271; /* Verde similar ao botão de adicionar endereço */
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;

export const ButtonContainer = styled.div`
  align-self: flex-start; /* Alinha o botão de voltar à esquerda */
  margin-bottom: 20px;
`;
