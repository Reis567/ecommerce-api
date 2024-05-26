import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const IconContainer = styled.div`
  margin-bottom: 20px;
`;

export const SuccessIcon = styled.div`
  font-size: 100px;
  color: green;
  border: 5px solid green;
  border-radius: 50%;
  padding: 20px;
`;

export const Message = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const HomeButton = styled(Button)`
  background-color: #389c9c;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  &:hover {
    background-color: #2a7b7b;
  }
`;


