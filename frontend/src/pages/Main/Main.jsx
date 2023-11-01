import React from 'react';
import CategorySelection from './CategorySelection/CategorySelection';
import AccomodationList from './AccomodationList/AccomodationList';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <CategorySelection />
      <AccomodationList />
    </div>
  );
};

export default Main;
