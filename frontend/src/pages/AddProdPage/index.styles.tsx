import styled from 'styled-components';
import { Button, Input as AntdInput, Select as AntdSelect } from 'antd';

export const Content = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f2f5;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled(AntdInput)`
  height: 40px;
  font-size: 16px;
`;

export const TextArea = styled(AntdInput.TextArea)`
  font-size: 16px;
`;

export const Select = styled(AntdSelect)`
  font-size: 16px;
`;

export const AntdButton = styled(Button)`
  height: 50px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 20px;
  align-self: flex-start;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;
