import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckoutContainer, 
  CheckoutTitle, 
  CheckoutContent,
  PaymentMethodContainer,
  TotalAmount,
  PaymentMethodLabel,
  PaymentMethodSelect,
  PaymentFormContainer,
  FormLabel,
  FormInput,
  FormSelect,
  CheckoutButton,
  BackButton,
  ButtonContainer
} from './index.styles.tsx';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckoutClick = () => {
    // Lógica para concluir a compra
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === 'credit_card') {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };

  const isPaymentMethodSelected = paymentMethod !== '';

  return (
    <CheckoutContent>
      <CheckoutContainer>
        <ButtonContainer>
          <BackButton onClick={handleBackClick}>Voltar</BackButton>
        </ButtonContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>
        <TotalAmount>Total da Compra: R$ 299,97</TotalAmount>
        <PaymentMethodContainer>
          <PaymentMethodLabel>Método de Pagamento:</PaymentMethodLabel>
          <PaymentMethodSelect value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">Selecione...</option>
            <option value="credit_card">Cartão de Crédito</option>
            <option value="boleto">Boleto</option>
            <option value="pix">Pix</option>
          </PaymentMethodSelect>
        </PaymentMethodContainer>
        {showPaymentForm && (
          <PaymentFormContainer>
            <FormLabel>Número do Cartão:</FormLabel>
            <FormInput type="text" placeholder="Número do Cartão" />
            <FormLabel>CVV:</FormLabel>
            <FormInput type="text" placeholder="CVV" />
            <FormLabel>Vencimento:</FormLabel>
            <FormInput type="text" placeholder="Vencimento" />
            <FormLabel>Nome do Titular:</FormLabel>
            <FormInput type="text" placeholder="Nome do Titular" />
            <FormLabel>CPF do Titular:</FormLabel>
            <FormInput type="text" placeholder="CPF do Titular" />
            <FormLabel>Parcelamento:</FormLabel>
            <FormSelect>
              <option value="">Selecione o Parcelamento</option>
              {[...Array(12)].map((_, index) => (
                <option key={index + 1} value={`${index + 1}`}>{`${index + 1}x`}</option>
              ))}
            </FormSelect>
          </PaymentFormContainer>
        )}
        <CheckoutButton onClick={handleCheckoutClick} disabled={!isPaymentMethodSelected}>
          Concluir Compra
        </CheckoutButton>
      </CheckoutContainer>
    </CheckoutContent>
  );
};

export default CheckoutPage;
