import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, SpnSty, LinkS } from './ProductCard.styles.tsx';
import { useNavigate } from 'react-router-dom';
import PopupNotification from '../PopupNotification/PopupNotification.tsx'; // Importa o componente do popup

const { Meta } = StyledCard;

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  idProduto: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description, price, idProduto }) => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchIsFavorite = async () => {
      const token = localStorage.getItem('accessToken'); // Supondo que você armazena o token no localStorage
      if (!token) {
        console.error('Usuário não autenticado');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/is-favorite/${idProduto}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.is_favorite);
        } else {
          console.error('Failed to check if product is favorite');
        }
      } catch (error) {
        console.error('Failed to check if product is favorite', error);
      }
    };

    fetchIsFavorite();
  }, [idProduto]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem('accessToken'); // Supondo que você armazena o token no localStorage
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/toggle-favorite/${idProduto}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFavorite((prev) => !prev);
      } else {
        console.error('Failed to toggle favorite');
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Lógica para adicionar ao carrinho
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000); // Oculta o popup após 3 segundos
  };

  const handleNavigateToAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/enderecos-envio');
  };

  return (
    <LinkS to={`/produto/${idProduto}`}>
      <StyledCard
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={imageUrl} />}
        actions={[
          <Button 
            key="favorite" 
            icon={<FontAwesomeIcon icon={faHeart} style={{ color: isFavorite ? 'red' : 'gray' }} />} 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(); }} 
          />,
          <Button key="cart" icon={<FontAwesomeIcon icon={faCartPlus} style={{ zIndex: 2 }} />} onClick={handleButtonClick} />,
          <Button key="buy" icon={<FontAwesomeIcon icon={faDollarSign} style={{ zIndex: 2 }} />} onClick={handleNavigateToAddress} />
        ]}
      >
        <Meta
          title={title}
          description={description}
          style={{ marginBottom: 10 }}
        />
        <SpnSty>
          R$ {price}
        </SpnSty>
      </StyledCard>
      <PopupNotification message={`${title} adicionado ao carrinho`} visible={popupVisible} />
    </LinkS>
  );
}

export default ProductCard;
