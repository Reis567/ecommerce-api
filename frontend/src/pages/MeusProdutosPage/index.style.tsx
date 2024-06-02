import styled from 'styled-components';
import { Button } from 'antd';

export const Content = styled.div`
  min-height: 100vh;
`;

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
  font-size: 66px;
`;

export const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  justify-content: center;
`;

export const ProductItem = styled.div`
  padding: 16px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
`;

export const AddProductButton = styled(Button)`
  margin-bottom: 20px;
  height: auto;
  font-size: 26px;
  align-self: flex-end;
  background-color: #faa757;
  color: black;
  font-weight: bolder;
`;

export const BackButton = styled(Button)`
  height: auto;
  font-size: 26px;
  margin-bottom: 20px;
  align-self: flex-start;
  background-color: #4caf50;
  color: white;
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const EditButton = styled(Button)`
  height: auto;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteButton = styled(Button)`
  height: auto;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #e53935;
  }
`;
