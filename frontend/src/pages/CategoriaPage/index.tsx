import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingMessage, ErrorMessage, PaginationButton } from './index.styles';
import { CategoContent, CatTitle, CardCateg } from './index.styles';
import ProductCard from '../../components/ProductCard/ProductCard';

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

const CategoriaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [categoryName, setCategoryName] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategoryDetails = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setCategoryName(response.data.title);

      const baseUrl = 'http://127.0.0.1:8000';
      const adjustedProducts = response.data.products.map((product: any) => ({
        ...product,
        imageUrl: product.imageUrl
          ? `${baseUrl}${product.imageUrl}`
          : 'https://static.vecteezy.com/ti/vetor-gratis/p1/3586230-sem-foto-sinal-adesivo-com-texto-inscricao-no-fundo-isolado-gratis-vetor.jpg',
      }));

      setProducts(adjustedProducts);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error) {
      console.error('Failed to fetch category details:', error);
      setError('Failed to fetch category details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialUrl = `http://127.0.0.1:8000/api/v1/categories/${id}/?limit=5&offset=0`;
    fetchCategoryDetails(initialUrl);
  }, [id]);

  const handleNextPage = () => {
    if (nextPage) {
      fetchCategoryDetails(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchCategoryDetails(previousPage);
    }
  };

  return (
    <CategoContent>
      <CatTitle>Categoria {categoryName}</CatTitle>

      {isLoading ? (
        <LoadingMessage>Carregando...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <CardCateg>
            {products.map(product => (
              <ProductCard
                key={product.id}
                idProduto={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
          </CardCateg>
          <div>
            <PaginationButton onClick={handlePreviousPage} disabled={!previousPage}>
              Anterior
            </PaginationButton>
            <PaginationButton onClick={handleNextPage} disabled={!nextPage}>
              Próxima
            </PaginationButton>
          </div>
        </>
      )}
    </CategoContent>
  );
};

export default CategoriaPage;
