import React, { useState } from 'react';
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
    <LinkS to={`/produto/${idProduto}/botafogo`}>
      <StyledCard
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={imageUrl} />}
        actions={[
          <Button key="favorite" icon={<FontAwesomeIcon icon={faHeart} style={{ zIndex: 2 }} />} onClick={handleButtonClick} />,
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
