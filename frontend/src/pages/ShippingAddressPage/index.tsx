import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AddressContainer, 
  AddressTitle, 
  AddressList, 
  AddressItem, 
  AddButton,
  AddressContent,
} from './index.styles.tsx';

const ShippingAddressPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddAddress = () => {
    console.log('Adicionar novo endereço');
  };

  const handleSelectAddress = (address: string) => {
    console.log('Selecionar endereço:', address);
    navigate('/checkout');
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Selecione o Endereço de Envio</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          <AddressItem onClick={() => handleSelectAddress('Rua Exemplo, 123, Cidade, Estado, CEP 12345-678')}>
            Rua Exemplo, 123, Cidade, Estado, CEP 12345-678
          </AddressItem>
          <AddressItem onClick={() => handleSelectAddress('Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678')}>
            Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678
          </AddressItem>
        </AddressList>
      </AddressContainer>
    </AddressContent>
  );
};

export default ShippingAddressPage;
