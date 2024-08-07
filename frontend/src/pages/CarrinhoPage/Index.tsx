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
    CalculateShippingButton,
    FreightOptionsContainer,
    FreightOptionLabel,
    SummarySection,
    CepSection,
    CustomCheckbox,
    CustomLabel
} from './index.styles.tsx';

interface CartItem {
    id: string;
    product_id: string;
    product_image: string;
    product_name: string;
    quantity: number;
    price: number;
}

interface FreightOption {
    id: number;
    name: string;
    price: string;
    custom_price: string;
    discount: string;
    delivery_time: number;
    company?: object;
    error?: string;
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [cep, setCep] = useState<string>('');
    const [freightOptions, setFreightOptions] = useState<FreightOption[]>([]);
    const [selectedFreight, setSelectedFreight] = useState<number | null>(null);
    const [userAddresses, setUserAddresses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://localhost:8000/api/v1/carts/list_items/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data && response.data.items) {
                    setCartItems(response.data.items);
                    setTotal(response.data.total);
                } else {
                    setCartItems([]);
                    setTotal(0);
                }
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
                setCartItems([]);
                setTotal(0);
            }
        };

        const fetchUserAddresses = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://localhost:8000/api/v1/addresses/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.data && response.data.length > 0) {
                    setUserAddresses(response.data);
                    const defaultAddress = response.data.find((address: any) => address.favorite_address) || response.data[0];
                    setCep(defaultAddress.cep);
                    handleCalculateShipping(defaultAddress.cep);
                }
            } catch (error) {
                console.error('Failed to fetch user addresses:', error);
            }
        };

        fetchCartItems();
        fetchUserAddresses();
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

    const handleCheckout = () => {
        navigate('/enderecos/envio');
    };

    const handleCalculateShipping = async (cepValue?: string) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/calculate-shipping/', {
                cep: cepValue || cep,
            });
            console.log('Shipping response:', response.data);
            if (response.data && response.data.freight) {
                setFreightOptions(response.data.freight);
            } else {
                console.error('Invalid response format:', response.data);
                setFreightOptions([]);
            }
        } catch (error) {
            console.error('Failed to calculate shipping:', error);
        }
    };

    const handleFreightSelection = (price: string) => {
        setSelectedFreight(parseFloat(price));
    };

    return (
        <CartContainer>
            <CartItemsContainer>
                {cartItems.length > 0 ? (
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
                ) : (
                    <p>Seu carrinho está vazio.</p>
                )}
            </CartItemsContainer>
            <CartSummaryContainer>
                <SummarySection>
                    <SummaryTitle>Total</SummaryTitle>
                    {selectedFreight === null ? (
                        <SummaryTotal>R$ {total.toFixed(2)}</SummaryTotal>
                    ) : (
                        <SummaryTotal>
                            <span>R$ {(total + selectedFreight).toFixed(2)}</span>
                        </SummaryTotal>
                    )}
                </SummarySection>
                {userAddresses.length === 0 && (
                    <CepSection>
                        <SummaryItem>
                            <span>Digite seu CEP:</span>
                            <CepInput
                                type="text"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                            />
                        </SummaryItem>
                        <CalculateShippingButton onClick={() => handleCalculateShipping()}>Calcular Frete</CalculateShippingButton>
                    </CepSection>
                )}
                {freightOptions && freightOptions.length > 0 && (
                    <FreightOptionsContainer>
                        {freightOptions.map((option, index) => (
                            option.error ? null : (
                                <SummaryItem key={index}>
                                    <CustomLabel htmlFor={`freight-${index}`}>
                                        <CustomCheckbox
                                            type="radio"
                                            name="freight"
                                            id={`freight-${index}`}
                                            value={option.price}
                                            onChange={() => handleFreightSelection(option.price)}
                                        />
                                        <FreightOptionLabel>{option.name} - R$ {parseFloat(option.price).toFixed(2)} ({option.delivery_time} dias úteis)</FreightOptionLabel>
                                    </CustomLabel>
                                </SummaryItem>
                            )
                        ))}
                    </FreightOptionsContainer>
                )}
                {selectedFreight !== null && (
                    <CheckoutButton onClick={handleCheckout}>Finalizar Compra</CheckoutButton>
                )}
            </CartSummaryContainer>
        </CartContainer>
    );
};

export default CartPage;
