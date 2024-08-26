import styled from 'styled-components';
import { Button } from 'antd';

export const AddressContent = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export const AddressContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 80px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const AddressTitle = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

export const AddressList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;
interface AddressItemProps {
  isFavorite: boolean;
}

export const AddressItem = styled.div<AddressItemProps>`
  padding: 15px;
  margin-bottom: 10px;
  width: 100%;
  background-color: ${({ isFavorite }) => (isFavorite ? '#f5f5dc' : '#fff')}; /* Bege para favoritos, branco para os outros */
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;


export const AddressActions = styled.div`
  display: flex;
  gap: 10px;

  .anticon {
    font-size: 18px;
    cursor: pointer;
    color: #239271;

    &:hover {
      color: #1e8266;
    }
  }
`;

export const FavoriteIcon = styled.div<{ isFavorite: boolean }>`
  color: ${props => (props.isFavorite ? 'gold' : 'gray')};
  cursor: pointer;

  &:hover {
    color: gold;
  }
`;

export const AddButton = styled(Button)`
  align-self: flex-end;
  background-color: #239271;
  color: white;
  margin-bottom: 20px;

  &:hover {
    background-color: #1e8266;
  }
`;
