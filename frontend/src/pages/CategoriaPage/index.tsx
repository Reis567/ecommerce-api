import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CategoContent,
  CatTitle,
  CardCateg,
} from './index.styles';
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

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/categories/${id}/`);
        setCategoryName(response.data.title);

        // Ajustar a URL da imagem para incluir o prefixo do backend
        const baseUrl = 'http://127.0.0.1:8000';
        const adjustedProducts = response.data.products.map((product: any) => ({
          ...product,
          imageUrl: product.imageUrl ? `${baseUrl}${product.imageUrl}` : 'https://static.vecteezy.com/ti/vetor-gratis/p1/3586230-sem-foto-sinal-adesivo-com-texto-inscricao-no-fundo-isolado-gratis-vetor.jpg',
        }));

        setProducts(adjustedProducts);
      } catch (error) {
        console.error('Failed to fetch category details:', error);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  return (
    <CategoContent>
      <CatTitle>Categoria {categoryName}</CatTitle>
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
    </CategoContent>
  );
};

export default CategoriaPage;
