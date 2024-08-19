import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
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
import { useAuth } from '../../contexts/AuthContext'; // Importe o contexto de autenticação

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  is_favorite: boolean;
}

const MyAddressesPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [favoriteAddressId, setFavoriteAddressId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId } = useAuth(); // Acesse o userId do contexto

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/address/`, {
        params: { user_id: userId }, // Passe o userId nos parâmetros da requisição
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = response.data;
      if (data.results && Array.isArray(data.results)) {
        console.log(data.results);
        setAddresses(data.results);
        const favorite = data.results.find((address) => address.is_favorite);
        if (favorite) {
          setFavoriteAddressId(favorite.id);
        }
      } else {
        console.error('Resposta da API não contém o array "results":', data);
      }
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

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await axios.delete(`/api/v1/address/${addressId}/`);
      fetchAddresses();
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
    }
  };

  const handleSetFavorite = async (addressId: string) => {
    try {
      await axios.post(`/api/v1/address/${addressId}/set_favorite/`);
      setFavoriteAddressId(addressId);
    } catch (error) {
      console.error('Erro ao definir endereço favorito:', error);
    }
  };

  return (
    <AddressContent>
      <AddressContainer>
        <AddressTitle>Meus Endereços</AddressTitle>
        <AddButton onClick={handleAddAddress}>Adicionar Novo Endereço</AddButton>
        <AddressList>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressItem key={address.id}>
                {address.street}, {address.city}, {address.state}, {address.postal_code}
                <AddressActions>
                  <EditOutlined onClick={() => handleEditAddress(address.id)} />
                  <DeleteOutlined onClick={() => handleDeleteAddress(address.id)} />
                  <FavoriteIcon 
                    onClick={() => handleSetFavorite(address.id)} 
                    isFavorite={address.id === favoriteAddressId}
                  >
                    <StarOutlined />
                  </FavoriteIcon>
                </AddressActions>
              </AddressItem>
            ))
          ) : (
            <p>Nenhum endereço encontrado.</p>
          )}
        </AddressList>
      </AddressContainer>
    </AddressContent>
  );
};

export default MyAddressesPage;
