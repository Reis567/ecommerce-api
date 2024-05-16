import React, { useState } from 'react';
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
  ProdDesc,

  Thumbnail,
  ThumbnailContainer,
  BigImageContainer
} from './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const tags = ['Novo', 'Popular', 'Desconto', 'Limitado'];

  // Estado para gerenciar a imagem grande e as imagens pequenas
  const [bigImage, setBigImage] = useState<string>('https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png');
  const [thumbnails, setThumbnails] = useState<string[]>([
    'https://http2.mlstatic.com/D_NQ_NP_790036-MLB69158458097_042023-O.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpvemgFB3JEtqXxpg6k6x4Bf61hrm_bdy8tOvJed7Zw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKW15Votj7j1J5nRE9kfzdAlNDNlXFXOhxpVFii_a7Fg&s'
  ]);

  const handleThumbnailClick = (thumbnail: string) => {
    setThumbnails([bigImage, ...thumbnails.filter(img => img !== thumbnail)]);
    setBigImage(thumbnail);
  };

  return (
    <ProdContent>
      <ContentLeft>
        <BigImageContainer>
          <ImgS src={bigImage} />
        </BigImageContainer>
        <ThumbnailContainer>
          {thumbnails.map((thumbnail, index) => (
            <Thumbnail key={index} src={thumbnail} onClick={() => handleThumbnailClick(thumbnail)} />
          ))}
        </ThumbnailContainer>
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
            <Price>R$ 99,99</Price>
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
