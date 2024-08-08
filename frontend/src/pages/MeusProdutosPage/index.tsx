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
  ProductActions,
  EditButton,
  DeleteButton
} from './index.style';
import { Input, Pagination, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../../components/ProductInfoModal/ProductInfoModal'; // Importação correta

const MyProductsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form] = Form.useForm();

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

  const handleAddProduct = () => {
    setIsAddModalVisible(true);
    form.resetFields(); // Reseta os campos do formulário
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (id: number) => {
    // Implement delete product logic here
    console.log('Delete product', id);
  };

  const handleModalOk = async () => {
    try {
      const values = form.getFieldsValue();
      const token = localStorage.getItem('accessToken');
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct 
        ? `http://127.0.0.1:8000/api/v1/products/${editingProduct.id}/` 
        : 'http://127.0.0.1:8000/api/v1/products/';

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Atualiza a lista de produtos após a adição/edição
      fetchProducts();
      setIsModalVisible(false);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error('Failed to update/add product', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
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
        <Header>Meus Produtos</Header>
        <AddProductButton type="primary" onClick={handleAddProduct}>Adicionar Produto</AddProductButton>
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
                <EditButton onClick={() => handleEditProduct(product)}>Editar</EditButton>
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

      <ProductModal
        visible={isModalVisible || isAddModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        form={form}
        isEditing={!!editingProduct}
      />
    </Content>
  );
};

export default MyProductsPage;
