import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    CartContainer,
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
    BackButton,
    CepInput,
    CalculateShippingButton
} from './index.styles.tsx';

interface CartItem {
    id: string;
    product_id: string;
    product_image: string;
    product_name: string;
    quantity: number;
    price: number;
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [cep, setCep] = useState<string>('');
    const [freight, setFreight] = useState<number | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://localhost:8000/api/v1/carts/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setCartItems(response.data.items);
                setTotal(response.data.total);
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = async (itemId: string) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await axios.delete(`http://localhost:8000/api/v1/cart/${itemId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleCheckout = () => {
        navigate('/enderecos-envio');
    };

    const handleCalculateShipping = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/calculate-shipping/', {
                cep,
            });
            setFreight(response.data.freight);
        } catch (error) {
            console.error('Failed to calculate shipping:', error);
        }
    };

    return (
        <CartContainer>
            <CartItemsContainer>
                <ButtonContainer>
                    <BackButton onClick={handleBackClick}>Voltar</BackButton>
                </ButtonContainer>
                <Table>
                    <tbody>
                        {cartItems.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <ProdLink to={`/produto/${item.product_id}`}>
                                        <ProductImage src={item.product_image} alt={item.product_name} />
                                        <ProductName>{item.product_name}</ProductName>
                                    </ProdLink>
                                </TableCell>
                                <TableCell>
                                    <Quantity>{item.quantity}</Quantity>
                                </TableCell>
                                <TableCell>
                                    <Price>R$ {item.price.toFixed(2)}</Price>
                                </TableCell>
                                <TableCell>
                                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>X</RemoveButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </CartItemsContainer>
            <CartSummaryContainer>
                <SummaryTitle>Resumo do Carrinho</SummaryTitle>
                <SummaryItem>
                    <span>Total do Carrinho:</span>
                    <span>R$ {total.toFixed(2)}</span>
                </SummaryItem>
                <SummaryItem>
                    <span>Digite seu CEP:</span>
                    <CepInput 
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />
                    <CalculateShippingButton onClick={handleCalculateShipping}>Calcular Frete</CalculateShippingButton>
                </SummaryItem>
                {freight !== null && (
                    <SummaryItem>
                        <span>Total do Frete:</span>
                        <span>R$ {freight.toFixed(2)}</span>
                    </SummaryItem>
                )}
                <SummaryTotal>
                    <span>Total:</span>
                    <span>R$ {(total + (freight || 0)).toFixed(2)}</span>
                </SummaryTotal>
                <CheckoutButton onClick={handleCheckout}>Comprar</CheckoutButton>
            </CartSummaryContainer>
        </CartContainer>
    );
};

export default CartPage;
