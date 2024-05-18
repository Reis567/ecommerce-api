// src/pages/MyAddressesPage/index.styles.tsx
import styled from 'styled-components';
import { Button } from 'antd';

export const AddressContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AddressTitle = styled.h1`
  margin-bottom: 20px;
`;

export const AddressList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const AddressItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const AddButton = styled(Button)`
  align-self: flex-end;
  background-color: #239271;
  color: white;
  margin-bottom: 20px;
  &:hover {
    background-color: #1e8266;
  }
`;
