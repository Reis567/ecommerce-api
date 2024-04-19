import React, { useState } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa'
import { Container,Nav,NavTitle,SLink } from './Header.styles.tsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'


const Header: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavBar = () => {
      setIsNavOpen(!isNavOpen);
    };


  return (
    <Container>

    <NavTitle>
      <Link to={"/"}>
       E-Commerce
      </Link>
    </NavTitle>
    
    <Nav isOpen={isNavOpen} as="div">
        <SLink to="/" onClick={toggleNavBar}>Inicio</SLink>
        <SLink to="/sobre" onClick={toggleNavBar}>Categorias</SLink>
        <SLink to="/experiencia" onClick={toggleNavBar}>
          Carrinho
        <FontAwesomeIcon icon={faCartShopping} />
        </SLink>
        <SLink to="/projetos" onClick={toggleNavBar}>Projetos</SLink>
        <SLink to="/contatos" onClick={toggleNavBar}>Contatos</SLink>
        <button className='nav-btn nav-close-btn' onClick={toggleNavBar}>
            <FaTimes/>
        </button>
    </Nav>

    <button className='nav-btn' onClick={toggleNavBar}>
            <FaBars/>
    </button>

    </Container>
  );
};

export default Header;