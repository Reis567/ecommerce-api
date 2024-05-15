import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import {
  ProdContent,
  ProdTitle,
  ContentLeft,
  ContentRight,
  RightHead,
  RightBody,
  RightTags,
  ImgS,
  BuyBtn,
  FavBtn,
  CartBtn,
  ContBtns,
  ContPrice,
  Price,
  TagsTitle,
  StyledTag,
  ProdDesc
} from './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const tags = ['Novo', 'Popular', 'Desconto', 'Limitado'];
  return (
    <ProdContent>
      <ContentLeft>
        <ImgS src='https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png' />
      </ContentLeft>

      <ContentRight>
        <RightHead>
          <ProdTitle>Produto 32151</ProdTitle>
          <ProdDesc>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, laborum debitis. Natus quos assumenda vero qui voluptatum pariatur impedit saepe corrupti magnam ut eligendi, consectetur ipsum suscipit quod facilis. Quisquam.
          </ProdDesc>
        </RightHead>

        <RightBody>
          <ContPrice>
            <Price>
              R$ 99,99
            </Price>
          </ContPrice>

          <ContBtns>
            <CartBtn>
              <FontAwesomeIcon icon={faShoppingCart} /> Adicionar ao Carrinho
            </CartBtn>

            <BuyBtn>
              <FontAwesomeIcon icon={faDollarSign} /> Comprar
            </BuyBtn>

            <FavBtn>
              <FontAwesomeIcon icon={faHeart} /> Favoritar
            </FavBtn>
          </ContBtns>
        </RightBody>

        <RightTags>
          <TagsTitle>Tags</TagsTitle>
          {tags.map((tag) => (
            <StyledTag key={tag}>{tag}</StyledTag>
          ))}
        </RightTags>
      </ContentRight>
    </ProdContent>
  );
};

export default ProdutoDetalhes;
