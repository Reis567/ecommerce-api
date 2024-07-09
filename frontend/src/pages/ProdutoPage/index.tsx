import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Input, Button as AntButton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import PopupNotification from '../../components/PopupNotification/PopupNotification.tsx';
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
  CommentsCount,
  BackButtonContainer,
  BackButton,
  StarsContainer
} from './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [bigImage, setBigImage] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const [comments, setComments] = useState<{ user: string, text: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
        setBigImage(data.images[0] || '');
        setThumbnails(data.images.slice(1).filter(Boolean) || []);
        setComments(data.comments || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleThumbnailClick = (thumbnail: string) => {
    setThumbnails([bigImage, ...thumbnails.filter(img => img !== thumbnail)]);
    setBigImage(thumbnail);
  };

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

  const handleBuyClick = () => {
    navigate('/enderecos-envio'); // Substitua '/shipping-address' pela rota correta para a página de endereço de entrega
  };

  const handleAddToCart = () => {
    // Lógica para adicionar ao carrinho
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000); // Oculta o popup após 3 segundos
  };

  const handleBackClick = () => {
    navigate(-1); // Volta para a página anterior
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <ProdContent>
      <BackButtonContainer>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
      </BackButtonContainer>
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
          <StarsContainer>
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#FFD700', marginRight: '5px' }} />
            ))}
          </StarsContainer>
          <ProdTitle>{product.title}</ProdTitle>
          <ProdDesc>{product.detail}</ProdDesc>
        </RightHead>

        <RightBody>
          <ContPrice>
            <Price>R$ {product.price}</Price>
          </ContPrice>

          <ContBtns>
            <CartBtn onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faShoppingCart} /> Adicionar ao Carrinho
            </CartBtn>

            <BuyBtn onClick={handleBuyClick}>
              <FontAwesomeIcon icon={faDollarSign} /> Comprar
            </BuyBtn>

            <FavBtn>
              <FontAwesomeIcon icon={faHeart} /> Favoritar
            </FavBtn>
          </ContBtns>
        </RightBody>

        <RightTags>
          <TagsTitle>Tags</TagsTitle>
          {product.tags.map((tag: { name: string }) => (
            <StyledTag key={tag.name}>{tag.name}</StyledTag>
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
      <PopupNotification message={`${product.title} adicionado ao carrinho`} visible={popupVisible} />
    </ProdContent>
  );
};

export default ProdutoDetalhes;
