import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import {SpaceSty} from './Dropdown.styles';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        catego1
      </a>
    ),
  },


];

const DropPerso: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <SpaceSty>
        Categorias
        <DownOutlined />
      </SpaceSty>
    </a>
  </Dropdown>
);

export default DropPerso;