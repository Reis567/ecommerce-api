import React from 'react';
import { useParams } from 'react-router-dom';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  return (
    <div>
     <h1>Detalhes do Produto</h1>
      <p>ID: {id}</p>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default ProdutoDetalhes;
