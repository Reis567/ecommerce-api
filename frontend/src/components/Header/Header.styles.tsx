import { Link } from 'react-router-dom';
import styled from 'styled-components'


export const Container = styled.div`
  width: 100%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;
  padding: 2rem;
  color: #727377;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  
  

  &.responsive_nav {
    transform:none;
  }
`;

export const Nav = styled.nav<{isOpen:boolean}>`
    position: relative;



    @media only screen and  (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #2a2a2a;
    transition: 1s;
    transform: translateY(${(props) => (props.isOpen ? '0' : '-100vh')});
    //display: none;  
  }

`;


export const SLink = styled(Link)`
  margin: 0 2rem;
  color: #faa757;
  font-weight: bolder;
  font-size: 20px;
  position: relative;
  text-decoration:None;

  &::after {
    position: absolute;
    content: " ";
    width: 0;
    height: 2px;
    background: #faa757;
    bottom: -20%;
    left: 0;
    transition: width 0.3s ease-in-out; 
  }

  &:hover::after {
    width: 100%;
  }
`;
export const CategoItem = styled(Link)`
  margin: 5px;
  padding: 5px;
  color: #faa757;
  font-weight: bolder;
  font-size: 20px;
  position: relative;
  text-decoration:None;

  &::after {
    position: absolute;
    content: " ";
    width: 0;
    height: 2px;
    background: #faa757;
    bottom: -20%;
    left: 0;
    transition: width 0.3s ease-in-out; 
  }

  &:hover::after {
    width: 100%;
  }
`;


export const CategoLink = styled.span`
  font-weight: bolder;
  color: #faa757;
  font-weight: bolder;
  font-size: 20px;
  position: relative;


  cursor: pointer;
  &::after {
    position: absolute;
    content: " ";
    width: 0;
    height: 1px;
    background: #faa757;
    bottom: 0;
    left: 0;
    transition: width 0.3s ease-in-out; 
  }

  &:hover::after {
    width: 100%;
  }
`;


export const NavTitle = styled.h3`
  font-size: 30px;
  font-weight: bolder;
  a{
    color:#faa757;
    text-decoration: None;
  }

  @media only screen and  (max-width: 425px){
    font-size: 20px;
  }
`

export const CategoryList = styled.div`
  gap: 10px;
    position: absolute;
    padding-bottom: 15px;
    left: 15%;
    width: 26%;
    top: 180%;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-top: none; /* Remove a borda superior para que não se sobreponha ao link de categorias */
    border-radius: 0 0 5px 5px; /* Arredonda apenas os cantos inferiores */
    z-index: 1; /* Defina um z-index menor para que a lista não se sobreponha a outros elementos */
    display: flex; /* Exibe os itens em uma coluna */
    flex-direction: column; /* Organiza os itens em uma coluna */

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Adiciona uma sombra leve */

`;
