// styles.ts
import styled from 'styled-components';
import { Button, Form } from 'antd';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

export const AuthForm = styled(Form)`
  width: 400px;
  padding: 24px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const AuthTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
`;

export const AuthButton = styled(Button)`
  width: 100%;
  background-color: #239271;
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;
