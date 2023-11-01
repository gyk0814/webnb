import React, { useState } from 'react';
import CountryListItem from './CountryListItem';
import './CountryList.scss';

const COUNTRY_LIST = [
  {
    id: 1,
    image: '/images/map.png',
    text: '한국',
  },
  {
    id: 2,
    image: '/images/map.png',
    text: '일본',
  },
  {
    id: 3,
    image: '/images/map.png',
    text: '동남아시아',
  },
  {
    id: 4,
    image: '/images/map.png',
    text: '이탈리아',
  },
  {
    id: 5,
    image: '/images/map.png',
    text: '미국',
  },
  {
    id: 6,
    image: '/images/map.png',
    text: '유럽',
  },
];

const CountryList = () => {
  const [countryData, setCountryData] = useState([]);

  const handleGetCountryDetail = () => {
    fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => setCountryData(data));
  };

  return (
    <div className="countryListContainer">
      <div className="countryLisBox">
        <div className="boxHeader">지역으로 검색하기</div>
        <div className="boxBody">
          {!countryData ? (
            <p>예약할 수 있는 상품이 없습니다.</p>
          ) : (
            COUNTRY_LIST.map(country => (
              <CountryListItem
                key={country.id}
                image={country.image}
                text={country.text}
                onClick={handleGetCountryDetail}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
