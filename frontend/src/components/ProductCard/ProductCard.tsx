import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, SpnSty,LinkS } from './ProductCard.styles.tsx';


const { Meta } = StyledCard;

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  id:string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description, price,id }) => {

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <LinkS to={`produto/${id}/botafogo`}>
      <StyledCard
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={imageUrl} />}
        actions={[
          <Button key="favorite" icon={<FontAwesomeIcon icon={faHeart} style={{ zIndex: 2 }} />} onClick={handleButtonClick} />,
          <Button key="cart" icon={<FontAwesomeIcon icon={faCartPlus} style={{ zIndex: 2 }} />} onClick={handleButtonClick} />
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
    </LinkS>
  );
}

export default ProductCard;
