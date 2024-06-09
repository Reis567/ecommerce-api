import React, { useEffect, useState } from 'react';
import { Container, ProdDiv, PaginationButton } from './index.styles';
import ProductCard from '../../components/ProductCard/ProductCard';
import CarouselHome from '../../components/Carousel/index';

const Inicio: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const fetchProducts = async (url: string) => {
    const token = localStorage.getItem('accessToken'); // Recuperar o token do localStorage

    try {
      const response = await fetch(url, {
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
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } else {
        throw new Error('Data format is not correct');
      }
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts('http://127.0.0.1:8000/api/v1/products/?limit=5&offset=0');
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  const handleNextPage = () => {
    if (nextPage) {
      fetchProducts(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchProducts(previousPage);
    }
  };

  return (
    <Container>
      <CarouselHome />
      <ProdDiv>
        {products.map((product) => {
          const imageUrl = product.photo_urls && product.photo_urls.length > 0 ? product.photo_urls[0] : 'defaultImageUrl.jpg';
          return (
            <ProductCard
              key={product.id}
              idProduto={product.id.toString()}
              imageUrl={imageUrl}
              title={product.title}
              description={product.detail}
              price={product.price}
            />
          );
        })}
      </ProdDiv>
      <div>
        <PaginationButton onClick={handlePreviousPage} disabled={!previousPage}>
          Anterior
        </PaginationButton>
        <PaginationButton onClick={handleNextPage} disabled={!nextPage}>
          Próxima
        </PaginationButton>
      </div>
    </Container>
  );
};

export default Inicio;
