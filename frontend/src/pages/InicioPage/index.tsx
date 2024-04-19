import React from 'react'
import{ Card }from"antd";
const { Meta } = Card;
import {Container,InicioTitle}from './index.styles.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Inicio: React.FC = () => {
  return (
    <Container>
      <InicioTitle>
        Produtos
      </InicioTitle>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9su24gdGNlP0Dh4CtT5G4f8KsijhjET9cOymhV8XKg&s" />}
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>

    </Container>
  )
}

export default Inicio;