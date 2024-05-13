import React from 'react';
import { useParams } from 'react-router-dom';
import {CategoContent,CatTitle} from './index.styles'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';

const CategoriaPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>(); // Obtendo o ID e o slug da categoria dos parâmetros de rota

  // Aqui você pode usar o ID e o slug da categoria para buscar e exibir os itens da categoria

  return (
    <CategoContent>
      <CatTitle>Itens da Categoria {id} ({slug})</CatTitle>
      <Link to={''}>
            <ProductCard
                imageUrl="https://example.com/product-image.jpg"
                title="Europe Street beat"
                description="www.instagram.com"
                price="99,99"
            />
      </Link>

    </CategoContent>
  );
};

export default CategoriaPage;
