import React from 'react';
import { StyledCarousel,Content } from './index.style';



const CarouselHome: React.FC = () => {
  return (
    <>
    <StyledCarousel dotPosition={'top'}>
      <div>
        <Content>1</Content>
      </div>
      <div>
        <Content>2</Content>
      </div>
      <div>
        <Content>3</Content>
      </div>
      <div>
        <Content>4</Content>
      </div>
    </StyledCarousel>
    </>
  );
};

export default CarouselHome;
