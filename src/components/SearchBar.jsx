// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ onSearch }) => (
    <input
        type="text"
        placeholder="Search by country name..."
        className="border p-2 w-full"
        onChange={(e) => onSearch(e.target.value)}
    />
);

export default SearchBar;
