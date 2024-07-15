import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  min-height: 100vh;
  text-align: center;
`;
export const Title = styled.h2`
  font-size: 44px;

`
export const ProdDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-height: 90vh;
  flex-wrap: wrap;
  gap: 15px;
  text-align: center;
`;

export const LoadingMessage = styled.div`
  font-size: 20px;
  color: #007bff;
`;

export const ErrorMessage = styled.div`
  font-size: 20px;
  color: red;
`;
