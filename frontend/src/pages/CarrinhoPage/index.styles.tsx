import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const CartContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px;
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
`;

export const CartItemsContainer = styled.div`
    width: 60%;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CartSummaryContainer = styled.div`
    width: 30%;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

export const TableCell = styled.td`
    padding: 10px;
    text-align: center;
    vertical-align: middle;
`;
export const ProdLink = styled(Link)`
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: None;
`
export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

export const ProductName = styled.span`
    font-size: 16px;
    font-weight: bold;
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

export const SummaryTitle = styled.h2`
    text-align: center;
`;

export const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

export const SummaryTotal = styled(SummaryItem)`
    font-weight: bold;
    font-size: 18px;
`;

export const CheckoutButton = styled(Button)`
    background-color: #239271;
    color: white;
    &:hover {
        background-color: #1e8266;
    }
    align-self: center;
    margin-top: 20px;
`;


export const BackButton = styled(Button)`
  background-color: #239271; 
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;


export const ButtonContainer = styled.div`
  align-self: flex-start; 
  margin-bottom: 20px;
`;
