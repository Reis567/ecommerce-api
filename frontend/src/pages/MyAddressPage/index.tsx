import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { 
  AddressContainer, 
  AddressTitle, 
  AddressList, 
  AddressItem, 
  AddButton,
  AddressContent,
  AddressActions
} from './index.styles';

const MyAddressesPage: React.FC = () => {

  const handleAddAddress = () => {
    console.log('Adicionar novo endereço');
  };

  const handleEditAddress = (address: string) => {
    console.log('Editar endereço:', address);
  };

  const handleDeleteAddress = (address: string) => {
    console.log('Excluir endereço:', address);
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Meus Endereços</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          <AddressItem>
            Rua Exemplo, 123, Cidade, Estado, CEP 12345-678
            <AddressActions>
              <EditOutlined onClick={() => handleEditAddress('Rua Exemplo, 123, Cidade, Estado, CEP 12345-678')} />
              <DeleteOutlined onClick={() => handleDeleteAddress('Rua Exemplo, 123, Cidade, Estado, CEP 12345-678')} />
            </AddressActions>
          </AddressItem>
          <AddressItem>
            Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678
            <AddressActions>
              <EditOutlined onClick={() => handleEditAddress('Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678')} />
              <DeleteOutlined onClick={() => handleDeleteAddress('Avenida Exemplo, 456, Cidade, Estado, CEP 12345-678')} />
            </AddressActions>
          </AddressItem>
        </AddressList>
      </AddressContainer>
    </AddressContent>
  );
};

export default MyAddressesPage;
