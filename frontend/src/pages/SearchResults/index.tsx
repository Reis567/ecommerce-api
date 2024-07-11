import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard'; // Assumindo que você tem um componente ProductCard

const SearchResults: React.FC = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search).get('query');
      if (!query) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/search-products/?search=${query}`);
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Resultados da Pesquisa</h2>
      <div>
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
