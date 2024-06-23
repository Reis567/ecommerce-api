import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FavoritesContent,
  FavoritesContainer,
  FavoritesTitle,
  BackButton,
  Table,
  TableRow,
  TableCell,
  ProductImage,
  ProductName,
  Price,
  RemoveButton,
  ButtonContainer,
  ProdLink
} from './index.styles.tsx';

const FavoritosPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    const token = localStorage.getItem('accessToken'); // Supondo que você armazena o token no localStorage
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/user-favorites/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      setError('Failed to fetch favorite products');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    const token = localStorage.getItem('accessToken'); // Supondo que você armazena o token no localStorage
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/toggle-favorite/${productId}/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Remover o item da lista localmente após a remoção bem-sucedida
      setFavorites(favorites.filter(favorite => favorite.id !== productId));
    } catch (error) {
      setError('Failed to remove favorite product');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <FavoritesContent>
      <FavoritesContainer>
        <ButtonContainer>
          <BackButton onClick={handleBackClick}>Voltar</BackButton>
        </ButtonContainer>
        <FavoritesTitle>Favoritos</FavoritesTitle>
        <Table>
          <tbody>
            {favorites.map(favorite => (
              <TableRow key={favorite.id}>
                <TableCell>
                  <ProdLink to={`/produto/${favorite.id}/botafogo`}>
                    <ProductImage src={favorite.photo_urls[0] || 'https://via.placeholder.com/150'} alt={favorite.title} />
                    <ProductName>{favorite.title}</ProductName>
                  </ProdLink>
                </TableCell>
                <TableCell>
                  <Price>R$ {favorite.price}</Price>
                </TableCell>
                <TableCell>
                  <RemoveButton onClick={() => handleRemoveItem(favorite.id)}>X</RemoveButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </FavoritesContainer>
    </FavoritesContent>
  );
};

export default FavoritosPage;
