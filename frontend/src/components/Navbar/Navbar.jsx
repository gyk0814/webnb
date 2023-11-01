import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import CountryList from './CountryList';
import useOutsideClick from '../../hooks/useClickOutside';
import './Navbar.scss';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isToggleCountryMenu, setIsToggleCountryMenu] = useState(false);
  const expandedRef = useRef();

  const handleToggleCountryMenu = () => {
    setIsToggleCountryMenu(prev => !prev);
  };

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  useOutsideClick(expandedRef, () => {
    setIsToggleCountryMenu(false);
    setIsExpanded(false);
  });

  return (
    <div className="navbarContainer">
      <div className="navbarContentBox">
        <Link to="/">
          <Logo />
        </Link>
        {!isExpanded ? (
          <Search handleSearchClick={handleSearchClick} />
        ) : (
          <div className="fullExpanded" ref={expandedRef}>
            <p className="searchTitle">숙소</p>
            <div
              className="expandedSearchContainer"
              onClick={handleToggleCountryMenu}
            >
              <div className="searchCountryBox">
                <p className="expandedSearchInputName">
                  어느 나라로 여행하실래요?
                </p>
                <p>국가 검색</p>
              </div>
              <div className="expandedSearchIconBox">
                <ImSearch className="expandedSearchIcon" size={14} />
                <span className="searchText">검색</span>
              </div>
            </div>
            {isToggleCountryMenu && <CountryList />}
          </div>
        )}
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
