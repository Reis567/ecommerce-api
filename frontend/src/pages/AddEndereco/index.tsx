import React, { useState } from 'react';
import { Container, Header, Form, Input, AntdButton, Content } from './index.styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAddressPage: React.FC = () => {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress = {
      cep,
      street,
      number,
      state,
      city,
      country,
    };

    try {
      await axios.post('/api/v1/address/', newAddress);
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
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
