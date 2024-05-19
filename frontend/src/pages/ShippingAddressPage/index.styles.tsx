import styled, { css } from 'styled-components';
import { Button } from 'antd';

export const AddressContent = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const AddressContainer = styled.div`
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

export const BackButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const BackButton = styled(Button)`
  background-color: #239271;
  color: white;
  margin-bottom: 20px;

  &:hover {
    background-color: #1e8266;
  }
`;

export const AddressTitle = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

export const AddressList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const AddressItem = styled.li<{ selected: boolean }>`
  padding: 15px 20px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;

  ${({ selected }) =>
    selected &&
    css`
      border-color: #239271;
      background-color: #e6f9f0;
    `}

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .anticon {
    font-size: 18px;
    color: #239271;
    position: absolute;
    right: 20px;
  }
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

export const ContinueButton = styled(Button)`
  align-self: flex-end;
  background-color: #239271;
  color: white;
  margin-top: 20px;

  &:hover {
    background-color: #1e8266;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;
