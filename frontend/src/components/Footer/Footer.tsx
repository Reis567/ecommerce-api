import React from 'react';
import { FaCreditCard, FaBox, FaBriefcase } from 'react-icons/fa'; // Adicionando ícones
import { FooterContainer, FooterItem, FooterIcon, FooterText, Copyright, FooterItems } from './Footer.style';

const Footer: React.FC = () => {
    return (
      <FooterContainer>
        <FooterItems>
            <FooterItem>
                <FooterIcon><FaCreditCard size={60} /></FooterIcon>
                <FooterText>Formas de pagamento aceitas: Cartões de crédito, débito e PIX.</FooterText>
            </FooterItem>
            <FooterItem>
                <FooterIcon><FaBox size={60} /></FooterIcon>
                <FooterText>Entrega rápida e segura para todo o país.</FooterText>
            </FooterItem>
            <FooterItem>
                <FooterIcon><FaBriefcase size={60} /></FooterIcon>
                <FooterText>Trabalhe conosco e tenha oportunidades de crescimento.</FooterText>
            </FooterItem>
        </FooterItems>
        <Copyright>
          &copy; NegocioFechado 2024 | CNPJ: 00.000.000/0000-00 | Endereço: Rua Fictícia, 123, Cidade Exemplo, País
        </Copyright>
      </FooterContainer>
    );
};

export default Footer;
