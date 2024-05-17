import React from 'react';
import { Container, ProdDiv } from './index.styles.tsx';
import ProductCard from '../../components/ProductCard/ProductCard';

import CarouselHome from '../../components/Carousel/index.tsx';



const Inicio: React.FC = () => {
  return (
    <Container>
      <CarouselHome />
      <ProdDiv>
                <ProductCard
                    idProduto="1"
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png"
                    title="Europe Street beat"
                    description="www.instagram.com"
                    price="99,99"
                />
      </ProdDiv>
    </Container>
  );
}

export default Inicio;
