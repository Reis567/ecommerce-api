import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import PopupNotification from '../../components/PopupNotification/PopupNotification.tsx';
import ProductComments from '../../components/ProductComments/ProductComments';
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
  BackButtonContainer,
  BackButton,
  StarsContainer,
  CepInput,
  CalculateShippingButton,
  FreightOptionsContainer,
  FreightOptionLabel,
  FreteDiv
} from './index.styles.tsx';

const ProdutoDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigImage, setBigImage] = useState<string>('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [cep, setCep] = useState<string>('');
  const [freightOptions, setFreightOptions] = useState<any[]>([]);

  const baseUrl = 'http://127.0.0.1:8000';
  const defaultImageUrl = 'https://static.vecteezy.com/ti/vetor-gratis/p1/3586230-sem-foto-sinal-adesivo-com-texto-inscricao-no-fundo-isolado-gratis-vetor.jpg';

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/products/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
        const imageUrls = data.images.map((url: string) => url ? `${baseUrl}${url}` : defaultImageUrl);
        setBigImage(imageUrls[0] || defaultImageUrl);
        setThumbnails(imageUrls.slice(1) || []);
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

  const handleBuyClick = () => {
    navigate('/enderecos/envio');
  };

  const handleAddToCart = () => {
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000);
  };

  const renderStars = () => {
    const rating = product.product_rating.length > 0 ? product.product_rating[0] : 0;
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        style={{ color: index < rating ? '#FFD700' : '#d3d3d3', marginRight: '5px' }}
      />
    ));
  };

  const handleCalculateShipping = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/calculate-shipping/', {
        cep,
      });
      console.log('Shipping response:', response.data);
      if (response.data && response.data.freight) {
        setFreightOptions(response.data.freight);
      } else {
        console.error('Invalid response format:', response.data);
        setFreightOptions([]);
      }
    } catch (error) {
      console.error('Failed to calculate shipping:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const price = typeof product.price === 'number' ? product.price.toFixed(2) : '0.00';

  return (
    <ProdContent>
      <ContentLeft>
        <BackButtonContainer>
        </BackButtonContainer>
        <BigImageContainer>
          <ImgS src={bigImage} alt={product.name} />
        </BigImageContainer>
        <ThumbnailContainer>
          {thumbnails.map((thumbnail, index) => (
            <Thumbnail
              key={index}
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(thumbnail)}
            />
          ))}
        </ThumbnailContainer>
      </ContentLeft>

      <ContentRight>
        <RightHead>
          <ProdTitle>{product.name}</ProdTitle>
          <StarsContainer>{renderStars()}</StarsContainer>
          <ProdDesc>{product.description}</ProdDesc>
        </RightHead>
        <RightBody>
          <ContPrice>
            <Price>R${price}</Price>
          </ContPrice>
          <ContBtns>
            <BuyBtn onClick={handleBuyClick}>
              <FontAwesomeIcon icon={faDollarSign} />
              Comprar
            </BuyBtn>
            <CartBtn onClick={handleAddToCart}>
              <FontAwesomeIcon icon={faShoppingCart} />
              Adicionar ao Carrinho
            </CartBtn>
            <FavBtn>
              <FontAwesomeIcon icon={faHeart} />
              Favoritar
            </FavBtn>
          </ContBtns>


          <FreteDiv>
            <CepInput
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <CalculateShippingButton onClick={handleCalculateShipping}>Simular Frete</CalculateShippingButton>
          </FreteDiv>
          {freightOptions && freightOptions.length > 0 && (
            <FreightOptionsContainer>
              {freightOptions.map((option, index) => (
                !option.error && (
                  <div key={index}>
                    <FreightOptionLabel>{option.name} - R$ {parseFloat(option.price).toFixed(2)} ({option.delivery_time} dias úteis)</FreightOptionLabel>
                  </div>
                )
              ))}
            </FreightOptionsContainer>
          )}
        </RightBody>
        <RightTags>
          <TagsTitle>Tags:</TagsTitle>
          {product.tags.map((tag: string, index: number) => (
            <StyledTag key={index}>{tag}</StyledTag>
          ))}
        </RightTags>
        <RightComments>
          <ProductComments productId={id} />
        </RightComments>
      </ContentRight>
      <PopupNotification message={`${product.title} adicionado ao carrinho`} visible={popupVisible} />
    </ProdContent>
  );
};

export default ProdutoDetalhes;
