import React from 'react';
import './Button.scss';

const Button = ({
  text,
  onClick,
  disabled,
  size = 'full',
  border = 'black',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${size} ${border}`}
    >
      {text}
    </button>
  );
};

export default Button;
