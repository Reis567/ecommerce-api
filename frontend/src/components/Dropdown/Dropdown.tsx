import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { SpaceSty, DownStyled } from './Dropdown.styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DropPerso: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/categories/');
        
        // Verifique o formato da resposta
        console.log('API response:', response.data);
        
        // Acesse a lista de categorias dentro da chave `results`
        setCategories(response.data.results); 
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Verifique se categories é uma array antes de usar slice
  const displayedCategories = Array.isArray(categories) ? categories.slice(0, 10) : [];
  const hasMoreCategories = Array.isArray(categories) && categories.length > 10;

  const items = displayedCategories.map(category => ({
    key: category.id.toString(),
    label: (
      <Link to={`/categoria/${category.id}/${category.slug}`}>
        {category.title}
      </Link>
    ),
  }));

  // Adicione um item "Ver todas" se houver mais de 10 categorias
  if (hasMoreCategories) {
    items.push({
      key: 'ver-todas',
      label: (
        <Link to="/todas-categorias">
          Ver todas
        </Link>
      ),
    });
  }

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <SpaceSty>
          Categorias
          <DownStyled />
        </SpaceSty>
      </a>
    </Dropdown>
  );
};

export default DropPerso;
