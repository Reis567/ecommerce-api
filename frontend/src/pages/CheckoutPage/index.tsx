import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckoutContainer, 
  CheckoutTitle, 
  CheckoutTable, 
  TableHeader, 
  TableCell, 
  ProductCell, 
  ProductImage, 
  ProductName, 
  CheckoutButton, 
  BackButton ,
  CheckoutContent,
  ButtonContainer
} from './index.styles.tsx';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckoutClick = () => {
    // Lógica para concluir a compra
  };

  return (
    <CheckoutContent>
      <CheckoutContainer>
        <ButtonContainer>
          <BackButton onClick={handleBackClick}>Voltar</BackButton>
        </ButtonContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <CheckoutTable>
          <thead>
            <tr>
              <TableHeader>Quantidade</TableHeader>
              <TableHeader>Produto</TableHeader>
              <TableHeader>Valor</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>1</TableCell>
              <ProductCell>
                <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto" />
                <ProductName>Produto 1</ProductName>
              </ProductCell>
              <TableCell>R$ 99,99</TableCell>
            </tr>
            <tr>
              <TableCell>2</TableCell>
              <ProductCell>
                <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto" />
                <ProductName>Produto 2</ProductName>
              </ProductCell>
              <TableCell>R$ 199,98</TableCell>
            </tr>
            {/* Adicione mais itens conforme necessário */}
          </tbody>
        </CheckoutTable>
        <CheckoutButton onClick={handleCheckoutClick}>Concluir Compra</CheckoutButton>
      </CheckoutContainer>
    </CheckoutContent>
  );
};

export default CheckoutPage;
