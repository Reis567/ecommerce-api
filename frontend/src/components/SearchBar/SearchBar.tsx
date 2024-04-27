import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import {InputSty} from './Searchbar.styles'


const SearchBar: React.FC = () => (
  <InputSty
    size="large"
    placeholder="Pesquisar produtos"
    prefix={<SearchOutlined />}
  />
);

export default SearchBar;
