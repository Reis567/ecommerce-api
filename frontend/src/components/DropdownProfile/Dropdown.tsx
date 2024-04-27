import React from 'react';
import { DownOutlined,UserOutlined  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown,Button } from 'antd';
import {SpaceSty} from './DropdownProfile.styles';

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
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



];

const DropdownProfile: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Button>
          <SpaceSty>
            Categorias
            <DownOutlined />
          </SpaceSty>
      </Button>
    </a>
  </Dropdown>
);

export default DropdownProfile;