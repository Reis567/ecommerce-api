import { Carousel } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCarousel = styled(Carousel)`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: linear-gradient(to bottom, rgba(54, 77, 121, 0), #ffffff);
    pointer-events: none;
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
    color: rgba(0, 0, 0, 0.5);
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .slick-dots button:hover {
    color: rgba(0, 0, 0, 0.8);
  }

  .slick-dots li.slick-active button {
    color: rgba(0, 0, 0, 0.8);
    background: #faa757;
  }

  .slick-slide > div {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
`;

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  position: relative;
  z-index: 1;
  color: black;
  margin: 0;
  font-size: 25px;
`;

export const Price = styled.p`
  position: relative;
  z-index: 1;
  color: black;
  margin: 0;
  font-size: 20px;
  font-weight: bolder;
`;

