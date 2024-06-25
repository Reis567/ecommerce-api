import React, { useEffect, useState } from 'react';
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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    const token = localStorage.getItem('accessToken'); // Supondo que você armazena o token no localStorage
    if (!token) {
      console.error('Usuário não autenticado');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/vendor-products/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch vendor products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(filter.toLowerCase()) || 
    product.detail.toLowerCase().includes(filter.toLowerCase())
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
              <h3>{product.title}</h3>
              <p>{product.detail}</p>
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
