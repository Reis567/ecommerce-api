import { Link } from 'react-router-dom';
import styled from 'styled-components'


export const Container = styled.div`
  width: 100%;
  background: #341d08;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 80px;
  padding: 2rem;
  color: #f7f2ee;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  

  &.responsive_nav {
    transform:none;
  }
`;

export const Nav = styled.nav<{isOpen:boolean}>`


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
    background-color: #341d08;
    transition: 1s;
    transform: translateY(${(props) => (props.isOpen ? '0' : '-100vh')});
    //display: none;  
  }

`;


export const SLink = styled(Link)`
  margin: 0 2rem;
  color: #f7f2ee;
  font-weight: bolder;
  font-size: 20px;
  position: relative;

  &::after {
    position: absolute;
    content: " ";
    width: 0;
    height: 2px;
    background: #f7f2ee;
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

  @media only screen and  (max-width: 425px){
    font-size: 20px;
  }
`