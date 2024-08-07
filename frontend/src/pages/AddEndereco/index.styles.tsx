import styled from 'styled-components';
import { Button } from 'antd';

export const Content = styled.div`
position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 54px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

`;

export const Input = styled.input`
  padding: 15px;
  font-size: 26px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const AntdButton = styled(Button)`
  padding: 10px;
  height: auto;
  width: auto;
  font-size: 26px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  text-align: center;
  &:hover {
    background-color: #45a049;
  }
`;


export const BackButton = styled(Button)`
position: absolute;
top: 80px;
left: 80px;
height: auto;
font-size: 26px;
  background-color: #239271; 
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;
