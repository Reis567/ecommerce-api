import React, { useState } from 'react';
import {
  Container,
  Header,
  Form,
  Input,
  AntdButton,
  Content,
  BackButton,
  Select,
  TextArea,
} from './index.styles';
import { useNavigate } from 'react-router-dom';

const AddProductPage: React.FC = () => {
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para adicionar o produto
    console.log('Categoria:', category);
    console.log('Condição:', condition);
    console.log('Vendedor:', vendor);
    console.log('Preço:', price);
    console.log('Título:', title);
    console.log('Detalhes:', detail);
  };

  return (
    <Content>
      <BackButton onClick={handleBackClick}>
        Voltar
      </BackButton>
      <Header>
        Adicionar Produto
      </Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Select
            placeholder="Categoria"
            value={category}
            onChange={(value) => setCategory(value)}
            required
          >
            {/* Adicionar opções de categoria */}
            <Select.Option value="categoria1">Categoria 1</Select.Option>
            <Select.Option value="categoria2">Categoria 2</Select.Option>
          </Select>
          <Select
            placeholder="Condição"
            value={condition}
            onChange={(value) => setCondition(value)}
            required
          >
            {/* Adicionar opções de condição */}
            <Select.Option value="novo">Novo</Select.Option>
            <Select.Option value="usado">Usado</Select.Option>
          </Select>
          <Input
            type="text"
            placeholder="Vendedor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Detalhes"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          <AntdButton type="primary" htmlType="submit">
            Adicionar Produto
          </AntdButton>
        </Form>
      </Container>
    </Content>
  );
};

export default AddProductPage;
