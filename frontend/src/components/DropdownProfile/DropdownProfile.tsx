import React from 'react';
import { DownOutlined,UserOutlined ,ArrowRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import {SpaceSty} from './DropdownProfile.styles';

const items: MenuProps['items'] = [
  {
    label: 'User',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Compras
      </a>
    ),

  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Cupons
      </a>
    ),

  },

  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Meus Endereços
      </a>
    ),

  },
  {
    key: '5',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Sair <ArrowRightOutlined />
      </a>
    ),

  },



];

const DropdownProfile: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
          <SpaceSty>
          <UserOutlined />
            Usuario
            <DownOutlined />
          </SpaceSty>
    </a>
  </Dropdown>
);

export default DropdownProfile;