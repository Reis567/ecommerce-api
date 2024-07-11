import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { InputSty } from './Searchbar.styles';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <InputSty
      size="large"
      placeholder="Pesquisar produtos"
      prefix={<SearchOutlined />}
      value={searchQuery}
      onChange={handleSearch}
      onPressEnter={handleSearchSubmit}
    />
  );
};

export default SearchBar;
