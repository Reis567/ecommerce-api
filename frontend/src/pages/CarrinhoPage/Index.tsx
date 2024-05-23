import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContainer,
     CartItemsContainer,
      CartSummaryContainer,
       Table,
        TableCell,
         TableRow,
          ProductImage,
           ProductName,
            Quantity,
             Price,
              RemoveButton,
               SummaryTitle,
                SummaryItem,
                 SummaryTotal,
                  CheckoutButton,
                    ProdLink,
                    ButtonContainer,
                    BackButton } from './index.styles.tsx';

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };


    const handleRemoveItem = (itemId: string) => {
        // Lógica para remover o item do carrinho
        console.log('Remover item:', itemId);
    };

    const handleCheckout = () => {
        navigate('/enderecos-envio');
    };

    return (
        <CartContainer>
            <CartItemsContainer>
                <ButtonContainer>
                    <BackButton onClick={handleBackClick}>Voltar</BackButton>
                </ButtonContainer>
                <Table>
                    <tbody>
                        <TableRow>
                            <TableCell>
                                <ProdLink to={`/produto/1/botafogo`}>
                                            <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto 1" />
                                            <ProductName>Produto 2</ProductName>
                                </ProdLink>
                            </TableCell>
                            <TableCell>
                                <Quantity>1</Quantity>
                            </TableCell>
                            <TableCell>
                                <Price>R$ 99,99</Price>
                            </TableCell>
                            <TableCell>
                                <RemoveButton onClick={() => handleRemoveItem('1')}>X</RemoveButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                            <ProdLink to={`/produto/1/botafogo`}>
                                            <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto 1" />
                                            <ProductName>Produto 2</ProductName>
                                </ProdLink>
                            </TableCell>
                            <TableCell>
                                <Quantity>2</Quantity>
                            </TableCell>
                            <TableCell>
                                <Price>R$ 199,98</Price>
                            </TableCell>
                            <TableCell>
                                <RemoveButton onClick={() => handleRemoveItem('2')}>X</RemoveButton>
                            </TableCell>
                        </TableRow>
                        {/* Adicione mais itens conforme necessário */}
                    </tbody>
                </Table>
            </CartItemsContainer>
            <CartSummaryContainer>
                <SummaryTitle>Resumo do Pedido</SummaryTitle>
                <SummaryItem>
                    <span>Total do Carrinho:</span>
                    <span>R$ 299,97</span>
                </SummaryItem>
                <SummaryItem>
                    <span>Total do Frete:</span>
                    <span>R$ 29,99</span>
                </SummaryItem>
                <SummaryTotal>
                    <span>Total:</span>
                    <span>R$ 329,96</span>
                </SummaryTotal>
                <CheckoutButton onClick={handleCheckout}>Comprar</CheckoutButton>
            </CartSummaryContainer>
        </CartContainer>
    );
};

export default CartPage;
