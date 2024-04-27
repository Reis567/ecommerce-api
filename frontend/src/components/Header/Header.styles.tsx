import { Link } from 'react-router-dom';
import styled from 'styled-components'



export const HeaderCont = styled.div`
  display:flex;
  flex-direction: column;
  width: 100%;
`

export const NavContainer = styled.div`
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

export const SearchContainer = styled.div`
  width: 100%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;
  color: #727377;
  

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
