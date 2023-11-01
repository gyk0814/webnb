import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import './PayDone.scss';

const PayDone = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return (
    <div className="payDoneContainer">
      <div className="payDoneContentContainer">
        <div className="payDoneHeader">
          <h1>결제 완료</h1>
          <p>결제해주셔서 감사합니다.</p>
        </div>
        <div className="payDoneBody">
          <IoCheckmarkDoneCircleOutline size={300} />
          <p onClick={goToMain}>확인</p>
        </div>
      </div>
    </div>
  );
};

export default PayDone;
