import styled from 'styled-components';
import { Button } from 'antd';

export const CategoContent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  background-color: #f0f0f0;
`;

export const CardCateg = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 10px;
`;

export const CatTitle = styled.h2`
  font-size: 2rem;
  font-weight: bolder;
  margin: 20px 0;
  text-align: center;
`;

export const BackButtonContainer = styled.div`
  align-self: flex-start;
  margin-bottom: 20px;
`;

export const BackButton = styled(Button)`
  background-color: #239271; 
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;
