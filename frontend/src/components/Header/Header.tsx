import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Nav, NavTitle, SLink, CategoryList, CategoLink, CategoItem } from './Header.styles.tsx';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const categoryRef = useRef<HTMLSpanElement>(null);

    const toggleNavBar = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleCategoryList = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container>

            <NavTitle>
                <Link to={"/"}>
                    E-Commerce
                </Link>
            </NavTitle>

            <Nav isOpen={isNavOpen} as="div">
                <SLink to="/" onClick={toggleNavBar}>Inicio</SLink>
                <CategoLink onClick={toggleCategoryList} ref={categoryRef}>
                    Categorias
                    <FontAwesomeIcon icon={faChevronDown} />
                </CategoLink>
                {isCategoryOpen && (
                    <CategoryList>
                        <CategoItem to="/categoria1" onClick={toggleNavBar}>Categoria 1</CategoItem>
                        <CategoItem to="/categoria2" onClick={toggleNavBar}>Categoria 2</CategoItem>
                        {/* Adicione mais links para outras categorias aqui */}
                    </CategoryList>
                )}
                <SLink to="/experiencia" onClick={toggleNavBar}>
                    Carrinho
                    <FontAwesomeIcon icon={faCartShopping} />
                </SLink>
                <SLink to="/projetos" onClick={toggleNavBar}>Projetos</SLink>
                <SLink to="/contatos" onClick={toggleNavBar}>Contatos</SLink>
                <button className='nav-btn nav-close-btn' onClick={toggleNavBar}>
                    <FaTimes />
                </button>
            </Nav>

            <button className='nav-btn' onClick={toggleNavBar}>
                <FaBars />
            </button>

        </Container>
    );
};

export default Header;
