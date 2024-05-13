import React from 'react';
import { Container, ProdDiv } from './index.styles.tsx';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import CarouselHome from '../../components/Carousel/index.tsx';



const Inicio: React.FC = () => {
  return (
    <Container>
      <CarouselHome />
      <ProdDiv>

          <Link to={''}>
                <ProductCard
                    imageUrl="https://example.com/product-image.jpg"
                    title="Europe Street beat"
                    description="www.instagram.com"
                    price="99,99"
                />
          </Link>
      </ProdDiv>
    </Container>
  );
}

export default Inicio;
