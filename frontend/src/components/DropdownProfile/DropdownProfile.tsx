import React from 'react';
import { UserOutlined, ArrowRightOutlined, DashboardOutlined } from '@ant-design/icons'; // Import the Dashboard icon
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SpaceSty, DownStyled } from './DropdownProfile.styles';

const DropdownProfile: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '4') {
      navigate('/meus-enderecos'); // Navega para a página de endereços
    } else if (key === '5') { // Adicione a navegação para o dashboard
      navigate('/vendedor/dashboard');
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
      key: '5', // Chave única para o dashboard
      label: 'Dashboard',
      icon: <DashboardOutlined />, // Ícone do dashboard
    },
    {
      key: '6',
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
          <DownStyled />
        </SpaceSty>
      </a>
    </Dropdown>
  );
};

export default DropdownProfile;
