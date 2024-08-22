import React, { useState, useEffect } from 'react';
import { Container, Header, Form, Input, AntdButton, Content } from './index.styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const EditAddressPage: React.FC = () => {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [pais, setPais] = useState('');
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { addressId } = useParams<{ addressId: string }>();

  useEffect(() => {
    if (addressId) {
      fetchAddress();
    }
  }, [addressId]);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/address/${addressId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const address = response.data;
      setCep(address.cep);
      setLogradouro(address.logradouro);
      setNumero(address.numero);
      setEstado(address.estado);
      setBairro(address.bairro);
      setPais(address.pais);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const updatedAddress = {
      cep,
      logradouro,
      numero,
      estado,
      bairro,
      pais,
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/address/${addressId}/`, updatedAddress, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('Resposta da requisição:', response);
      navigate('/enderecos/meus_enderecos');
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
    }
  };

  return (
    <Content>
      <Header>Editar Endereço</Header>
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
            Atualizar Endereço
          </AntdButton>
        </Form>
      </Container>
    </Content>
  );
};

export default EditAddressPage;