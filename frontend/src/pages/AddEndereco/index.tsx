import React, { useState } from 'react';
import { Container, Header, Form, Input, AntdButton, Content,BackButton } from './index.styles';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const AddAddressPage: React.FC = () => {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para adicionar o endereço
    console.log('CEP:', cep);
    console.log('Logradouro:', street);
    console.log('Número:', number);
    console.log('Complemento:', complement);
    console.log('Estado:', state);
    console.log('Cidade:', city);
    console.log('País:', country);
  };

  return (
    <Content>

      <Header>
        Adicionar Endereço
      </Header>
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
            placeholder="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
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
