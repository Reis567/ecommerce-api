import { Carousel } from 'antd';
import styled from 'styled-components';

// Estilizando o componente do Carousel
export const StyledCarousel = styled(Carousel)`
  position: relative;
  

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px; // Altura do efeito de opacidade
    background: linear-gradient(to bottom, rgba(54, 77, 121, 0), #ffffff); // Gradiente de opacidade
    pointer-events: none;

  }

  .slick-prev, .slick-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #000;
    cursor: pointer;
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  .slick-prev {
    left: 10px; // Ajustando a posição da seta da esquerda
  }

  .slick-next {
    right: 10px; // Ajustando a posição da seta da direita
  }



  .slick-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    z-index: 1;
  }

  .slick-dots li {
    margin: 0 5px;
    background: #2a2a2a;
  }

  .slick-dots button {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5); // Definindo uma cor para os pontos indicadores
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .slick-dots button:hover {
    color: rgba(0, 0, 0, 0.8); // Alterando a cor ao passar o mouse
  }

  .slick-dots li.slick-active button {
    color: rgba(0, 0, 0, 0.8);
    background: #faa757;
     // Definindo uma cor mais forte para o ponto indicador ativo
  }

  .slick-slide > div {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #fff;
    background: #2a2a2a;
    position: relative;
    overflow: hidden;
  }
`;

export const Content = styled.h3`
  position: relative;
  z-index: 1;
`;
