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
  font-size: 90px;
  color: white;
  border-radius: 30%;
  padding: 25px 45px;
  background-color: #2a7b7b;
`;

export const Message = styled.h1`
  font-size: 54px;
  margin-bottom: 20px;
`;

export const HomeButton = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  font-size: 20px;
  
`;


