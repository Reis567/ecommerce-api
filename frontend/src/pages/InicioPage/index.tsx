import React, { useEffect, useState } from 'react';
import { Container, ProdDiv } from './index.styles';
import ProductCard from '../../components/ProductCard/ProductCard';
import CarouselHome from '../../components/Carousel/index';

const Inicio: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('accessToken'); // Recuperar o token do localStorage
      console.log(token);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/products/', {
          headers: {
            'Authorization': `Bearer ${token}` // Adicionar o token no cabeçalho da requisição
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data && Array.isArray(data.results)) {
          setProducts(data.results);
        } else {
          throw new Error('Data format is not correct');
        }
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  return (
    <Container>
      <CarouselHome />
      <ProdDiv>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            idProduto={product.id.toString()}
            imageUrl={product.imageUrl || 'defaultImageUrl.jpg'} // Adicione uma imagem padrão se `imageUrl` não estiver disponível
            title={product.title}
            description={product.detail}
            price={product.price}
          />
        ))}
      </ProdDiv>
    </Container>
  );
};

export default Inicio;
