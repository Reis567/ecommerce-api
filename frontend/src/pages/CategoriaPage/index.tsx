import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CategoContent,
  CatTitle,
  CardCateg,
  BackButtonContainer,
  BackButton
} from './index.styles';
import ProductCard from '../../components/ProductCard/ProductCard';

const CategoriaPage: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>(); // Obtendo o ID e o slug da categoria dos parâmetros de rota
  const navigate = useNavigate();

  // Função para lidar com o clique no botão de voltar
  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };
  return (
    <CategoContent>
      <BackButtonContainer>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
      </BackButtonContainer>
      <CatTitle>Itens da Categoria {id} ({slug})</CatTitle>
      <CardCateg>
        <ProductCard
          idProduto="1"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png"
          title="Europe Street beat"
          description="www.instagram.com"
          price="99,99"
        />
        {/* Adicione mais cards de produtos conforme necessário */}
      </CardCateg>
    </CategoContent>
  );
};

export default CategoriaPage;
