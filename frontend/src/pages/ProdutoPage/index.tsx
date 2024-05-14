import React from 'react';
import { useParams } from 'react-router-dom';
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
  Price
} from  './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();

  return (
    <ProdContent>
      <ContentLeft>
      <ImgS src='https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png'/>
      </ContentLeft>

      <ContentRight>
          <RightHead>
            <ProdTitle>Detalhes do Produto</ProdTitle>
            <p>ID: {id}</p>
            <p>Slug: {slug}</p>
          </RightHead>

          <RightBody>
            <ContPrice>
              <Price>
              price
              </Price>
            </ContPrice>

            <ContBtns>
                <CartBtn>
                    cart
                </CartBtn>
                
                  <BuyBtn>
                      buy
                  </BuyBtn>

                  <FavBtn>
                      fav
                  </FavBtn>
            </ContBtns>
          </RightBody>

          <RightTags>
            tags
          </RightTags>

      </ContentRight>

    </ProdContent>
  );
};

export default ProdutoDetalhes;
