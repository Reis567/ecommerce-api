import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, SpnSty } from './ProductCard.styles.tsx'; // Adapte isso com os estilos do seu card de produto
const { Meta } = StyledCard;
interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description, price }) => {
  return (
    <StyledCard
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src={imageUrl} />} // Usando a imagem passada como prop
      actions={[
        <Button key="favorite" icon={<FontAwesomeIcon icon={faHeart} />} />,
        <Button key="cart" icon={<FontAwesomeIcon icon={faCartPlus} />} />
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
  );
}

export default ProductCard;
