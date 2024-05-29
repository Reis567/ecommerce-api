import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

export const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
`;

export const ProductItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
`;

export const AddProductButton = styled(Button)`
  margin-bottom: 20px;
  align-self: flex-end;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;
