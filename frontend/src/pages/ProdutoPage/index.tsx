import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Input, Button as AntButton } from 'antd';
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
  BigImageContainer,
  RightComments,
  CommentsButton,
  CommentsCount
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

  // Estado para gerenciar o modal de comentários e os comentários
  const [comments, setComments] = useState<{ user: string, text: string }[]>([
    { user: 'João', text: 'Excelente produto!' },
    { user: 'Maria', text: 'Gostei muito, recomendo.' },
    { user: 'Pedro', text: 'Ótima qualidade e preço justo.' }
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = () => {
    const loggedInUser = 'Usuário Logado'; // Substitua pelo nome do usuário logado no futuro
    if (newComment.trim()) {
      setComments([...comments, { user: loggedInUser, text: newComment.trim() }]);
      setNewComment('');
    }
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

        <RightComments>
          <CommentsButton onClick={handleOpenModal}>Comentários</CommentsButton>
          <CommentsCount>{comments.length} Comentários</CommentsCount>
        </RightComments>

        <Modal
          title="Comentários"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          <Input
            placeholder="Escreva seu comentário"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <AntButton type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
            Enviar
          </AntButton>
          <div style={{ marginTop: '20px' }}>
            {comments.map((comment, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>{comment.user}:</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
        </Modal>
      </ContentRight>
    </ProdContent>
  );
};

export default ProdutoDetalhes;
