import React from 'react';
import { Card, Button } from 'antd';
import { Container, InicioTitle } from './index.styles.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
const { Meta } = Card;
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
        actions={[
          <Button key="favorite" icon={<FontAwesomeIcon icon={faHeart} />} />,
          <Button key="cart" icon={<FontAwesomeIcon icon={faCartPlus} />} />
        ]}
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </Container>
  );
}

export default Inicio;
