// FavoritosPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FavoritesContent,
  FavoritesContainer, 
  FavoritesTitle, 
  BackButton, 
  Table, 
  TableRow, 
  TableCell, 
  ProductImage, 
  ProductName, 
  Quantity, 
  Price, 
  RemoveButton, 
  ButtonContainer 
} from './index.styles.tsx';

const FavoritosPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleRemoveItem = (id: string) => {
        // Lógica para remover o item dos favoritos
    };

    return (
        <FavoritesContent>
            <FavoritesContainer>
                <ButtonContainer>
                    <BackButton onClick={handleBackClick}>Voltar</BackButton>
                </ButtonContainer>
                <FavoritesTitle>Favoritos</FavoritesTitle>
                <Table>
                    <tbody>
                        <TableRow>
                            <TableCell>
                                <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto 1" />
                                <ProductName>Produto 1</ProductName>
                            </TableCell>
                            <TableCell>
                                <Quantity>1</Quantity>
                            </TableCell>
                            <TableCell>
                                <Price>R$ 99,99</Price>
                            </TableCell>
                            <TableCell>
                                <RemoveButton onClick={() => handleRemoveItem('1')}>X</RemoveButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <ProductImage src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png" alt="Produto 2" />
                                <ProductName>Produto 2</ProductName>
                            </TableCell>
                            <TableCell>
                                <Quantity>2</Quantity>
                            </TableCell>
                            <TableCell>
                                <Price>R$ 199,98</Price>
                            </TableCell>
                            <TableCell>
                                <RemoveButton onClick={() => handleRemoveItem('2')}>X</RemoveButton>
                            </TableCell>
                        </TableRow>
                        {/* Adicione mais itens conforme necessário */}
                    </tbody>
                </Table>
            </FavoritesContainer>
        </FavoritesContent>
    );
};

export default FavoritosPage;
