import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { SpaceSty } from './Dropdown.styles';
import { Link } from 'react-router-dom'; // Importe Link do react-router-dom

const DropPerso: React.FC = () => {
  const categories = [
    { id: 1, name: 'Categoria 1', slug: 'categoria-1' },
    { id: 2, name: 'Categoria 2', slug: 'categoria-2' },
    // Adicione mais categorias conforme necessário
  ];

  const items: MenuProps['items'] = categories.map(category => ({
    key: category.id.toString(),
    label: (
      <Link to={`/categoria/${category.id}/${category.slug}`}>
        {category.name}
      </Link>
    ),
  }));

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <SpaceSty>
          Categorias
          <DownOutlined />
        </SpaceSty>
      </a>
    </Dropdown>
  );
};

export default DropPerso;
