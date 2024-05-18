// src/components/DropdownProfile/index.tsx
import React from 'react';
import { DownOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SpaceSty } from './DropdownProfile.styles';

const DropdownProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '4') {
      navigate('/meus-enderecos'); // Navega para a página de endereços
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'User',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Compras',
    },
    {
      key: '3',
      label: 'Cupons',
    },
    {
      key: '4',
      label: 'Meus Endereços',
    },
    {
      key: '5',
      label: (
        <span>
          Sair <ArrowRightOutlined />
        </span>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <SpaceSty>
          <UserOutlined />
          Usuário
          <DownOutlined />
        </SpaceSty>
      </a>
    </Dropdown>
  );
};

export default DropdownProfile;
