import styled from 'styled-components';
import { Button } from 'antd';

export const CheckoutContent = styled.div`
    width: 100%;
    min-height: 100vh;
`

export const CheckoutContainer = styled.div`
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

export const CheckoutTitle = styled.h1`
  margin-bottom: 20px;
`;

export const PaymentMethodContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export const TotalAmount = styled.div`
  font-size: 29px;
  margin-bottom: 20px;
  color: #239271; /* Cor verde para o valor total */
`;

export const PaymentMethodLabel = styled.label`
  font-size: 18px; /* Aumenta o tamanho do texto da label */
  margin-right: 10px;
`;

export const PaymentMethodSelect = styled.select`
  margin-left: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 40%;
`;

export const FormLabel = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
`;

export const FormSelect = styled.select`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const CheckoutButton = styled(Button)`
  margin-top: 20px;
  background-color: #239271;
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;

export const BackButton = styled(Button)`
  margin: 10px;
  background-color: #239271; /* Verde similar ao botão de adicionar endereço */
  color: white;
  &:hover {
    background-color: #1e8266;
  }
`;

