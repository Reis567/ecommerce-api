import React from 'react';
import { StyledCarousel, Content } from './index.style';

const CarouselHome: React.FC = () => {

  return (
    <>
      <StyledCarousel arrows dotPosition={'top'} autoplay >
        <div>
          <Content>Produto1</Content>
        </div>
        <div>
          <Content>Produto2</Content>
        </div>
        <div>
          <Content>Produto3</Content>
        </div>
        <div>
          <Content>Produto4</Content>
        </div>
      </StyledCarousel>
    </>
  );
};

export default CarouselHome;
