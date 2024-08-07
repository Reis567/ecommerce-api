// index.styles.tsx

import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const FavoritesContent = styled.div`
    width: 100%;
    min-height: 100vh;
`;

export const FavoritesContainer = styled.div`
  width: 80%;
  min-height: 80vh;
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

export const FavoritesTitle = styled.h1`
  margin-bottom: 20px;
`;
export const ProdLink = styled(Link)`
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: None;
`


export const BackButton = styled(Button)`
  background-color: #239271; 
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ffffff;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const ProductName = styled.span`
  font-size: 16px;
`;

export const Quantity = styled.span`
  font-size: 16px;
`;

export const Price = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #239271;
`;

export const RemoveButton = styled(Button)`
  background-color: #ff4d4f; 
  color: white;
  &:hover {
    background-color: #d9363e;
  }
`;

export const ButtonContainer = styled.div`
  align-self: flex-start; 
  margin-bottom: 20px;
`;
