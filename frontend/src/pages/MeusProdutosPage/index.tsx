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
  DeleteButton,
  ImageContainer,
  ProductImage
} from './index.style';
import { Input, Pagination, Form, Tag,Popconfirm,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../../components/ProductInfoModal/ProductInfoModal';

const MyProductsPage: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [conditions, setConditions] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    const token = localStorage.getItem('accessToken');
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
      //console.log('Fetched products:', data);
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch vendor products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/categories/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      //console.log('Fetched categories:', data);
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchConditions = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/conditions/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      //console.log('Fetched conditions:', data);
      setConditions(data);
    } catch (error) {
      console.error('Failed to fetch conditions', error);
    }
  };

  const fetchTags = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/tags/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      //console.log('Fetched tags:', data);
      setTags(data);
    } catch (error) {
      console.error('Failed to fetch tags', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchConditions();
    fetchTags();
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
    form.resetFields();
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
      tags: product.tags.map(tag => tag.id),
    });
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id: number) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/vendor-products/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        message.success('Produto excluído com sucesso!');
        setProducts(products.filter(product => product.id !== id));
      } else {
        message.error('Falha ao excluir o produto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      message.error('Erro ao excluir o produto. Por favor, tente novamente.');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = form.getFieldsValue();
      const token = localStorage.getItem('accessToken');
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct 
        ? `http://127.0.0.1:8000/api/v1/products/${editingProduct.id}/` 
        : 'http://127.0.0.1:8000/api/v1/products/';

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('detail', values.detail);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('condition', values.condition);
      formData.append('vendor', values.vendor);

      values.tags.forEach(tag => formData.append('tags', tag));
      
      if (values.photo_product1) formData.append('photo_product1', values.photo_product1.file.originFileObj);
      if (values.photo_product2) formData.append('photo_product2', values.photo_product2.file.originFileObj);
      if (values.photo_product3) formData.append('photo_product3', values.photo_product3.file.originFileObj);
      if (values.photo_product4) formData.append('photo_product4', values.photo_product4.file.originFileObj);
      if (values.photo_product5) formData.append('photo_product5', values.photo_product5.file.originFileObj);

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
        {paginatedProducts?.map(product => (
          <ProductItem key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.detail}</p>
            <ImageContainer>
              {product.images.map((image, index) => 
                image ? <ProductImage key={index} src={`http://127.0.0.1:8000${image}`} alt={`Product Image ${index + 1}`} /> : null
              )}
            </ImageContainer>
            <div>
              {product.tags.map(tag => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </div>
            <ProductActions>
              <EditButton onClick={() => handleEditProduct(product)}>Editar</EditButton>
              <Popconfirm
                title="Tem certeza que deseja excluir este produto?"
                onConfirm={() => handleDeleteProduct(product.id)}
                okText="Sim"
                cancelText="Não"
              >
                <DeleteButton>Excluir</DeleteButton>
              </Popconfirm>
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
        open={isModalVisible || isAddModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        form={form}
        isEditing={!!editingProduct}
        categories={categories}
        conditions={conditions}
        tags={tags}
      />

    </Content>
  );
};

export default MyProductsPage;
