import React from 'react';
import { UserOutlined, ArrowRightOutlined, DashboardOutlined, SkinOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SpaceSty, DownStyled } from './DropdownProfile.styles';
import { AuthContext, useAuth } from '../../contexts/AuthContext';
interface DropdownProfileProps {
  username: string;
}

const DropdownProfile: React.FC<DropdownProfileProps> = ({ username }) => {
  const navigate = useNavigate();
  const { userType } = useAuth();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '4') {
      navigate('/enderecos/meus_enderecos');
    } else if (key === '5') {
      navigate('/vendedor/dashboard');
    } else if (key === '1') {
      navigate('/perfil');
    } else if (key === '6') {
      navigate('/vendedor/meus-produtos');
    } else if (key === '7') {
      // Lógica para logout
      localStorage.removeItem('accessToken');
      navigate('/login');
      location.reload()
    }
  };

  const items: MenuProps['items'] = [
    {
      label: username,
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
    ...(userType === 'vendor' ? [{
      key: '5',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    }] : []),

    ...(userType === 'vendor' ? [{
      key: '6',
      label: 'Meus produtos',
      icon: <SkinOutlined />,
    }] : []),
    ...(userType === 'vendor' ? [{
      key: '7',
      label: 'Vendas',
      icon: <SkinOutlined />,
    }] : []),

    {
      key: '8',
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
          {username}
          <DownStyled />
        </SpaceSty>
      </a>
    </Dropdown>
  );
};

export default DropdownProfile;
