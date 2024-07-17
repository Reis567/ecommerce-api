import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledCarousel, Content, CarouselItem, Image, Title, Price } from './index.style';

const CarouselHome: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMostFavoritedProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/most-favorited-products/');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch most favorited products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostFavoritedProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <StyledCarousel arrows dotPosition={'top'} autoplay>
      {products.map((product) => {
        const baseUrl = 'http://127.0.0.1:8000';
        const imageUrl = product.photo_urls && product.photo_urls.length > 0
          ? `${baseUrl}${product.photo_urls[0]}`
          : 'https://static.vecteezy.com/ti/vetor-gratis/p1/3586230-sem-foto-sinal-adesivo-com-texto-inscricao-no-fundo-isolado-gratis-vetor.jpg';
        return (
          <Link key={product.id} to={`/produto/${product.id}`}>
            <CarouselItem>
              <Image src={imageUrl} alt={product.title} />
              <Title>{product.title}</Title>
              <Price>R$ {product.price}</Price>
            </CarouselItem>
          </Link>
        );
      })}
    </StyledCarousel>
  );
};

export default CarouselHome;
