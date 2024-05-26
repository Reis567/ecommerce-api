import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavContainer, SearchContainer, HeaderCont, Nav, NavTitle, SLink, NavRight } from './Header.styles.tsx';
import SearchBar from '../SearchBar/SearchBar.tsx'; // Importe o componente de campo de pesquisa aqui
import DropPerso from '../Dropdown/Dropdown.tsx';
import DropdownProfile from '../DropdownProfile/DropdownProfile.tsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavBar = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <HeaderCont>
            <SearchContainer>
                <NavTitle>
                    <Link to="/">
                        Negócio fechado
                    </Link>
                </NavTitle>
                <SearchBar />
            </SearchContainer>

            <NavContainer>
                <Nav isOpen={isNavOpen} as="div">
                    <DropPerso/>
                    <SLink to="/ofertas" onClick={toggleNavBar}>Ofertas</SLink>
                    <SLink to="/supermercado" onClick={toggleNavBar}>Supermercado</SLink>
                    <SLink to="/moda" onClick={toggleNavBar}>Moda</SLink>
                    <SLink to="/historico" onClick={toggleNavBar}>Histórico</SLink>
                    <SLink to="/eletronicos" onClick={toggleNavBar}>Eletrônicos</SLink>
                    <SLink to="/contato" onClick={toggleNavBar}>Ajuda</SLink>

                    <button className='nav-btn nav-close-btn' onClick={toggleNavBar}>
                        <FaTimes />
                    </button>
                </Nav>

                <button className='nav-btn' onClick={toggleNavBar}>
                    <FaBars />
                </button>
                <NavRight>
                    <DropdownProfile/>
                    <SLink to="/perfil/favoritos">
                        <FontAwesomeIcon icon={faHeart} />
                    </SLink>
                    <SLink to="/perfil/carrinho">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </SLink>
                    <SLink to="/perfil/compras">
                        Compras
                    </SLink>
                    {/*
                    <SLink to="/login">
                        Login
                    </SLink>
                    <SLink to="/register">
                        Registrar
                    </SLink>
                    <SLink to="/vendedor/login">
                        Login Vendedor
                    </SLink>
                    <SLink to="/vendedor/register">
                        Registrar Vendedor
                    </SLink>
                    */}
                </NavRight>
            </NavContainer>
        </HeaderCont>
    );
};

export default Header;
