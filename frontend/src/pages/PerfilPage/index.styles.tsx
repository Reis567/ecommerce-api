import styled from 'styled-components';
import { Button } from 'antd';


export const Content = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
margin-top: 100px;
position: relative;
`;



export const Container = styled.div`
    width: 80%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 55px;
`;

export const InfoSection = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  width:50%;
`;

export const InfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EditButton = styled(Button)`
height: auto;
width: auto;
font-size: 20px;
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

export const AddButton = styled(Button)`
height: auto;
width: auto;
font-size: 20px;
  margin-top: 15px;
  background-color: #008cba;
  color: white;
  &:hover {
    background-color: #007bb5;
  }
`;

export const UserImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;
export const BackButton = styled(Button)`
  position: absolute;
  top: 0px;
  left: 50px;
  background-color: #239271;
  color: white;
  height: auto;
width: auto;
font-size: 20px;

`;