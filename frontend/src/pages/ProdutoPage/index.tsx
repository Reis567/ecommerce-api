import React from 'react';
import { useParams } from 'react-router-dom';
import {ProdContent,ProdTitle,ContentLeft,ContentRight,RightHead,RightBody,RightTags} from  './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  return (
    <ProdContent>
      <ContentLeft>

      </ContentLeft>

      <ContentRight>
          <RightHead>
            <ProdTitle>Detalhes do Produto</ProdTitle>
            <p>ID: {id}</p>
            <p>Slug: {slug}</p>
          </RightHead>

          <RightBody>
            
          </RightBody>

          <RightTags>
            
          </RightTags>

      </ContentRight>

    </ProdContent>
  );
};

export default ProdutoDetalhes;
