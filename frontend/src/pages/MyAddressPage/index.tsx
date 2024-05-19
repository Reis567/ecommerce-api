// src/pages/MyAddressesPage/index.tsx
import React from 'react';

import { 
  AddressContainer, 
  AddressTitle, 
  AddressList, 
  AddressItem, 
  AddButton,
  AddressContent
} from './index.styles';

const MyAddressesPage: React.FC = () => {


  const handleAddAddress = () => {
    // Lógica para adicionar novo endereço
    console.log('Adicionar novo endereço');
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Meus Endereços</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          <AddressItem>Rua Exemplo, 123, Cidade, Estado, CEP 12345-678</AddressItem>
          <AddressItem>Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678</AddressItem>
          {/* Adicione mais endereços conforme necessário */}
        </AddressList>

      </AddressContainer>
    </AddressContent>
  );
};

export default MyAddressesPage;
