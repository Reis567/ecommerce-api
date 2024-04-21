import React from 'react';
import { Button } from 'antd';
import { Container, InicioTitle, StyledCard, ProdDiv, HeadProd, StyBtn , SpnSty} from './index.styles.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartPlus, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const { Meta } = StyledCard;

const Inicio: React.FC = () => {
  return (
    <Container>
      <HeadProd>
        <InicioTitle>
          Ultimos Produtos
        </InicioTitle>
        <StyBtn>
          Todos os produtos
          <FontAwesomeIcon icon={faArrowRightLong} />
        </StyBtn>
      </HeadProd>
      <ProdDiv>
        <StyledCard
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9su24gdGNlP0Dh4CtT5G4f8KsijhjET9cOymhV8XKg&s" />}
          actions={[
            <Button key="favorite" icon={<FontAwesomeIcon icon={faHeart} />} />,
            <Button key="cart" icon={<FontAwesomeIcon icon={faCartPlus} />} />
          ]}
        >
          <Meta
            title="Europe Street beat"
            description="www.instagram.com"
            style={{marginBottom:10}}
          />
          <SpnSty>
          R$ 99,99
          </SpnSty>
        </StyledCard>
      </ProdDiv>
    </Container>
  );
}

export default Inicio;
