import React, { useState } from 'react';
import { Container, Header, Form, Input, AntdButton, Content } from './index.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Importando o contexto de autenticação

const AddAddressPage: React.FC = () => {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [pais, setPais] = useState('');
  const navigate = useNavigate();
  const { userId } = useAuth(); // Obtendo o userId do contexto de autenticação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const newAddress = {
      cep,
      logradouro,
      numero,
      estado,
      bairro,
      pais,
      customer: userId, // Incluindo o userId no payload
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/address/create/create_address/', newAddress, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Incluindo o token no cabeçalho
        },
      });
      console.log('Resposta da requisição:', response);
      navigate('/enderecos/meus_enderecos');
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
    }
  };

  return (
    <Content>
      <Header>Adicionar Endereço</Header>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="País"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
          <AntdButton type="primary" htmlType="submit">
            Adicionar Endereço
          </AntdButton>
        </Form>
      </Container>
    </Content>
  );
};

export default AddAddressPage;
