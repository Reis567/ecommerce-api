import React from 'react';
import { useParams } from 'react-router-dom';
import {
  CategoContent,
  CatTitle,
  CardCateg,
} from './index.styles'
import ProductCard from '../../components/ProductCard/ProductCard';


const CategoriaPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>(); // Obtendo o ID e o slug da categoria dos parâmetros de rota

  // Aqui você pode usar o ID e o slug da categoria para buscar e exibir os itens da categoria

  return (
    <CategoContent>
      <CatTitle>Itens da Categoria {id} ({slug})</CatTitle>
      <CardCateg>
      <ProductCard
                    idProduto="1"
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png"
                    title="Europe Street beat"
                    description="www.instagram.com"
                    price="99,99"
                />
      </CardCateg>

    </CategoContent>
  );
};

export default CategoriaPage;
