import React, { useState } from 'react';
import {
  Container,
  Header,
  FilterContainer,
  ProductList,
  ProductItem,
  PaginationContainer,
  AddProductButton,
  Content,
  BackButton,
  ProductActions,
  EditButton,
  DeleteButton
} from './index.style';
import { Input, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const MyProductsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Dummy data for products
  const products = Array.from({ length: 70 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
  }));

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase()) || 
    product.description.toLowerCase().includes(filter.toLowerCase())
  );

  const productsPerPage = 40;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage, 
    currentPage * productsPerPage
  );

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditProduct = (id: number) => {
    // Implement edit product logic here
    console.log('Edit product', id);
  };

  const handleDeleteProduct = (id: number) => {
    // Implement delete product logic here
    console.log('Delete product', id);
  };

  return (
    <Content>
      <Container>
        <BackButton onClick={handleBackClick}>Voltar</BackButton>
        <Header>Meus Produtos</Header>
        <AddProductButton type="primary">Adicionar Produto</AddProductButton>
        <FilterContainer>
          <Input 
            placeholder="Filtrar produtos..." 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
          />
        </FilterContainer>
        <ProductList>
          {paginatedProducts.map(product => (
            <ProductItem key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <ProductActions>
                <EditButton onClick={() => handleEditProduct(product.id)}>Editar</EditButton>
                <DeleteButton onClick={() => handleDeleteProduct(product.id)}>Excluir</DeleteButton>
              </ProductActions>
            </ProductItem>
          ))}
        </ProductList>
        <PaginationContainer>
          <Pagination 
            current={currentPage} 
            total={filteredProducts.length} 
            pageSize={productsPerPage} 
            onChange={page => setCurrentPage(page)}
          />
        </PaginationContainer>
      </Container>
    </Content>
  );
};

export default MyProductsPage;
