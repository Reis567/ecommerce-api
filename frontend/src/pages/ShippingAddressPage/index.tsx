import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AddressContainer, 
  AddressTitle, 
  AddressList, 
  AddressItem, 
  AddButton,
  AddressContent,

  ContinueButton
} from './index.styles';
import { CheckOutlined } from '@ant-design/icons';

const ShippingAddressPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddAddress = () => {
    console.log('Adicionar novo endereço');
  };

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      console.log('Endereço selecionado:', selectedAddress);
      navigate('/checkout');
    }
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Selecione o Endereço de Envio</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          <AddressItem 
            onClick={() => handleSelectAddress('Rua Exemplo, 123, Cidade, Estado, CEP 12345-678')}
            selected={selectedAddress === 'Rua Exemplo, 123, Cidade, Estado, CEP 12345-678'}
          >
            Rua Exemplo, 123, Cidade, Estado, CEP 12345-678
            {selectedAddress === 'Rua Exemplo, 123, Cidade, Estado, CEP 12345-678' && <CheckOutlined />}
          </AddressItem>
          <AddressItem 
            onClick={() => handleSelectAddress('Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678')}
            selected={selectedAddress === 'Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678'}
          >
            Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678
            {selectedAddress === 'Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678' && <CheckOutlined />}
          </AddressItem>
        </AddressList>
        <ContinueButton onClick={handleContinue} disabled={!selectedAddress}>Continuar</ContinueButton>
      </AddressContainer>
    </AddressContent>
  );
};

export default ShippingAddressPage;
