import styled from 'styled-components';
import { Button, Tag } from 'antd';

export const ProdContent = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ProdTitle = styled.h2`
  font-weight: bolder;
  font-size: 40px;
`;

export const ProdDesc = styled.p`
  font-weight: bolder;
`;

export const ContentLeft = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ContentRight = styled.div`
  width: 60%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: left;
  align-items: center;
  flex-direction: column;
`;

export const RightHead = styled.div`
  width: 60%;
`;

export const RightBody = styled.div`
  width: 60%;
`;

export const RightTags = styled.div`
  width: 60%;
  margin-top: 20px;
`;

export const TagsTitle = styled.h5`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const StyledTag = styled(Tag)`
  margin: 5px;
  padding: 5px 10px;
  background-color: #727377;
  color: #faa757;
  font-size: 15px;
  font-weight: bolder;
`;

export const Images = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ImgS = styled.img`
  max-height: 400px;
  padding: 20px;
  cursor: pointer;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  margin: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border-color: #000;
  }
`;

export const BigImageContainer = styled.div`
  width: 65%;
  height: 65%;
  border: 2px solid;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContBtns = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const CartBtn = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FavBtn = styled(Button)`
  background-color: #9b3d2d;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BuyBtn = styled(Button)`
  background-color: #239271;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ContPrice = styled.div`
  margin-bottom: 20px;
`;

export const Price = styled.span`
  font-size: 44px;
  font-weight: bold;
`;

export const RightComments = styled.div`
  width: 60%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CommentsButton = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  padding: 10px 20px;
  width: auto;
  height: auto;
  color: white;
  border: none;
  cursor: pointer;
`;

export const CommentsCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #727377;
`;

export const BackButtonContainer = styled.div`
  align-self: flex-start;
  margin-bottom: 20px;
`;

export const BackButton = styled(Button)`
  background-color: #239271; 
  color: white;
  margin-left: 20px;
  margin-top: 20px;
  &:hover {
    background-color: #1e8266;
  }
`;
export const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const CepInput = styled.input`
  margin-top: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const CalculateShippingButton = styled(Button)`
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const FreightOptionsContainer = styled.div`
  margin-top: 20px;
`;

export const FreightOptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const CustomCheckbox = styled.input`
  margin-right: 10px;
`;

export const CustomLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const FreteDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`