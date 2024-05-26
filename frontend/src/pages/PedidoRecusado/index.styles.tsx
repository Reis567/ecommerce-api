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

export const ErrorIcon = styled.div`
  font-size: 100px;
  color: red;
  border: 5px solid red;
  border-radius: 50%;
  padding: 20px;
`;

export const Message = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;



export const RetryButton = styled(Button)`
  background-color: red;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  &:hover {
    background-color: darkred;
  }
`;
