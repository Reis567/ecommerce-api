import styled from 'styled-components';
import { Button } from 'antd';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const InfoSection = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EditButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const AddButton = styled(Button)`
  margin-top: 10px;
  background-color: #008cba;
  color: white;
  &:hover {
    background-color: #007bb5;
  }
`;

export const UserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;
