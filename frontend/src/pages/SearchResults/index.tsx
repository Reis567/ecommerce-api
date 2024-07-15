import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard'; // Assumindo que você tem um componente ProductCard
import { Container, ProdDiv, LoadingMessage, ErrorMessage,Title } from './index.styles'; // Importando estilos

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const baseUrl = 'http://127.0.0.1:8000'; // URL base do backend

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search).get('query');
      if (!query) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/search-products/?search=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  if (isLoading) {
    return <LoadingMessage>Carregando...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Resultados da Pesquisa</Title>
      <ProdDiv>
        {products.length > 0 ? (
          products.map(product => {
            const imageUrl = product.photo_urls && product.photo_urls.length > 0
              ? `${baseUrl}${product.photo_urls[0]}`
              : 'https://static.vecteezy.com/ti/vetor-gratis/p1/3586230-sem-foto-sinal-adesivo-com-texto-inscricao-no-fundo-isolado-gratis-vetor.jpg';
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
          })
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </ProdDiv>
    </Container>
  );
};

export default SearchResults;
