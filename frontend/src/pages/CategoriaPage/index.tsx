import React from 'react';
import { useParams } from 'react-router-dom';
import {CategoContent,CatTitle} from './index.styles'

const CategoriaPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>(); // Obtendo o ID e o slug da categoria dos parâmetros de rota

  // Aqui você pode usar o ID e o slug da categoria para buscar e exibir os itens da categoria

  return (
    <CategoContent>
      <CatTitle>Itens da Categoria {id} ({slug})</CatTitle>
      {/* Lista de itens da categoria */}
    </CategoContent>
  );
};

export default CategoriaPage;
