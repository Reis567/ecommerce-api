import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import { 
  AddressContainer, 
  AddressTitle, 
  AddressList, 
  AddressItem, 
  AddButton,
  AddressContent,
  AddressActions,
  FavoriteIcon
} from './index.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Address {
  id: string;
  logradouro: string;
  bairro: string;
  estado: string;
  cep: string;
  favorite_address: boolean; // Alterado para usar o campo correto da API
}

const MyAddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/address/`, {
        params: { user_id: userId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      const data = response.data;
      setAddresses(data);
  
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
    }
  };

  const handleAddAddress = () => {
    navigate('/enderecos/adicionar');
  };

  const handleEditAddress = (addressId: string) => {
    navigate(`/enderecos/editar/${addressId}`);
  };

  const handleDeleteClick = (addressId: string) => {
    setAddressToDelete(addressId);
    setIsModalVisible(true);
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/address/${addressToDelete}/`, {
        params: { user_id: userId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      fetchAddresses();
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
    } finally {
      setIsModalVisible(false);
      setAddressToDelete(null);
    }
  };

  const handleSetFavorite = async (addressId: string) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/address/${addressId}/set_favorite/`, null, {
        params: { user_id: userId },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      fetchAddresses();
    } catch (error) {
      console.error('Erro ao definir endereço favorito:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setAddressToDelete(null);
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Meus Endereços</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressItem 
                key={address.id}
                isFavorite={address.favorite_address} // Aplicando o estado de favorito corretamente
              >
                {address.logradouro}, {address.bairro}, {address.estado}, {address.cep}
                <AddressActions>
                  <EditOutlined onClick={() => handleEditAddress(address.id)} />
                  <DeleteOutlined onClick={() => handleDeleteClick(address.id)} />
                  <FavoriteIcon 
                    onClick={() => handleSetFavorite(address.id)} 
                    isFavorite={address.favorite_address}
                  >
                    {address.favorite_address ? <StarFilled style={{ color: '#FFD700' }} /> : <StarOutlined />}
                  </FavoriteIcon>
                </AddressActions>
              </AddressItem>
            ))
          ) : (
            <AddressItem isFavorite={false}>Nenhum endereço encontrado.</AddressItem>
          )}
        </AddressList>

        <Modal
          title="Confirmação de Exclusão"
          visible={isModalVisible}
          onOk={handleDeleteAddress}
          onCancel={handleCancel}
          okText="Excluir"
          cancelText="Cancelar"
        >
          <p>Você tem certeza que deseja excluir este endereço? Esta ação não pode ser desfeita.</p>
        </Modal>
      </AddressContainer>
    </AddressContent>
  );
};

export default MyAddressesPage;
