import React from 'react';
import { useParams } from 'react-router-dom';
import {ProdContent,ProdTitle} from  './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  return (
    <ProdContent>
     <ProdTitle>Detalhes do Produto</ProdTitle>
      <p>ID: {id}</p>
      <p>Slug: {slug}</p>
    </ProdContent>
  );
};

export default ProdutoDetalhes;
