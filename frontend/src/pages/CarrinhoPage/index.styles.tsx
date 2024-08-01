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
    height: 50vh;
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
    text-decoration: none;
`;

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

export const SummarySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const SummaryTitle = styled.h2`
    font-size: 40px;
    font-weight: bold;
`;

export const SummaryTotal = styled.span`
    font-size: 54px;
    font-weight: bold;
    color: #239271;
    text-align: center;

`;

export const CepSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;

    font-size: 20px;
`;

export const CepInput = styled.input`
    margin-left: 10px;
    padding: 5px;
    font-size: 30px;
    border: 1px solid #000000;
    border-radius: 4px;
    width: 60%;
    max-width: 200px;
`;

export const CalculateShippingButton = styled(Button)`
    margin-top: 20px;
    background-color: #239271;
    font-size: 20px;
    height: auto;
    color: white;
    &:hover {
        background-color: #1e7a61;
    }
`;

export const FreightOptionsContainer = styled.div`
    margin-bottom: 20px;
`;

export const FreightOptionLabel = styled.label`
    margin-left: 10px;
    font-size: 16px;
    color: #333;
`;

export const SummaryItem = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

export const CheckoutButton = styled(Button)`
    background-color: #239271;
    font-size: 20px;
    height: auto;
    color: white;
    width: 100%;
    &:hover {
        background-color: #1e7a61;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
`;

export const BackButton = styled(Button)`
    background-color: #d9d9d9;
    color: black;
    &:hover {
        background-color: #bfbfbf;
    }
`;
