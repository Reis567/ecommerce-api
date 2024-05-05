import React from 'react';

import {FooterContainer , FooterItem, Copyright,FooterItems} from './Footer.style'


const Footer: React.FC = () => {
    return (
      <FooterContainer>
        <FooterItems>

            <FooterItem>Item 1</FooterItem>
            <FooterItem>Item 2</FooterItem>
            <FooterItem>Item 3</FooterItem>
        </FooterItems>
        <Copyright>&copy; NegocioFechado 2024</Copyright>
      </FooterContainer>
    );
  };
 export default Footer;
 