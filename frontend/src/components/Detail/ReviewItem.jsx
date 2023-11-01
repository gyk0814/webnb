import React from 'react';
import './ReviewItem.scss';

const ReviewItem = ({ name, date, text, profileImage }) => {
  return (
    <div className="reviewItemContainer">
      <div className="reviewItemHeader">
        <img className="profileImage" src={profileImage} alt="프로필" />
        <div className="reviewItemProfile">
          <p className="name">{name}</p>
          <p className="date">{date}</p>
        </div>
      </div>
      <div className="reviewContent">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ReviewItem;
