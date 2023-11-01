import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './CategorySelection.scss';

const Category = () => {
  const [searchParams, setSearchparams] = useSearchParams();

  const handleCategory = categoryId => {
    searchParams.set('categoryId', categoryId);

    setSearchparams(searchParams);
  };

  useEffect(() => {
    searchParams.set('categoryId', CATEGORY_LIST[0].id);

    setSearchparams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="categorySelection">
      {CATEGORY_LIST.map(({ id, title }) => {
        const isSelected = searchParams.get('categoryId') === String(id);

        return (
          <div
            key={id}
            className={`category${isSelected ? ' selected' : ''}`}
            onClick={() => handleCategory(id)}
          >
            <img
              src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
              alt={title}
            />
            <span className="categoryName">{title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Category;

const CATEGORY_LIST = [
  { id: 1, title: '서울' },
  { id: 2, title: '대전' },
  { id: 3, title: '대구' },
  { id: 4, title: '부산' },
  { id: 5, title: '제주' },
  { id: 6, title: '경기' },
  { id: 7, title: '강원' },
  { id: 8, title: '청도' },
  { id: 9, title: '밀양' },
];
