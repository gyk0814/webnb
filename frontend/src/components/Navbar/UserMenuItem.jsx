import React from 'react';

const UserMenuItem = ({ className, text, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
};

export default UserMenuItem;
