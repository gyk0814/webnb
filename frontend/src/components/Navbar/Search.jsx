import React from 'react';
import { ImSearch } from 'react-icons/im';
import './Search.scss';

const Search = ({ handleSearchClick }) => {
  return (
    <div className="searchContainer" onClick={handleSearchClick}>
      <p className="searchInputName">어느 나라 어디든지 여행하세요</p>
      <div className="searchIconBox">
        <ImSearch className="searchIcon" size={14} />
      </div>
    </div>
  );
};

export default Search;
