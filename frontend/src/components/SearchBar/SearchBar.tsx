import React from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const SearchBar: React.FC = () => (
  <Input
    size="large"
    placeholder="Pesquisar produtos"
    prefix={<UserOutlined />}
  />
);

export default SearchBar;
