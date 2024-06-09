import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavContainer, SearchContainer, HeaderCont, Nav, NavTitle, SLink, NavRight } from './Header.styles.tsx';
import SearchBar from '../SearchBar/SearchBar.tsx';
import DropPerso from '../Dropdown/Dropdown.tsx';
import DropdownProfile from '../DropdownProfile/DropdownProfile.tsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    const toggleNavBar = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/user/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setIsAuthenticated(false);
        }
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
                    <DropPerso />
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
                    {isAuthenticated ? (
                        <>
                            <DropdownProfile />
                            <span>{userData?.username}</span>
                            <SLink to="/perfil/favoritos">
                                <FontAwesomeIcon icon={faHeart} />
                            </SLink>
                            <SLink to="/perfil/carrinho">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </SLink>
                            <SLink to="/perfil/compras">
                                Compras
                            </SLink>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </NavRight>
            </NavContainer>
        </HeaderCont>
    );
};

export default Header;
