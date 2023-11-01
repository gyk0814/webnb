import React from 'react';
import './CountryListItem.scss';

const CountryListItem = ({ image, text, onClick }) => {
  return (
    <div className="countryImg" onClick={onClick}>
      <img src={image} alt="지도" />
      <p>{text}</p>
    </div>
  );
};

export default CountryListItem;
