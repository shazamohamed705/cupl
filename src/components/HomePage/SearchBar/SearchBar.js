import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to search results page with query parameters
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&type=${searchType}`);
    }
  };

  const searchTypes = [
    { value: 'all', label: 'الكل', icon: 'fas fa-search' },
    { value: 'coupons', label: 'الكوبونات', icon: 'fas fa-tags' },
    { value: 'stores', label: 'المتاجر', icon: 'fas fa-store' },
    { value: 'categories', label: 'الفئات', icon: 'fas fa-th-large' }
  ];

};

export default SearchBar;
