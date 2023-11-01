import React, { useState } from 'react';
import { emailPattern } from '../../utils/constant';
import Button from '../Button/Button';
import Modal from './Modal';
import './RegisterModal.scss';

const RegisterModal = ({ onClose, handleRedirect }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = userInfo;

  const emailIsValid = emailPattern.test(email);
  const passwordIsValid = password.length >= 5;
  const isValid = emailIsValid && passwordIsValid && name !== '';

  const handleInputChange = e => {
    const { value, id } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegister = e => {
    e.preventDefault();

    if (!isValid) {
      alert('입력 값을 확인해 주세요!');
      return;
    }

    handleRedirect();

    fetch('http://10.58.52.103:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userInfo),
    })
      .then(res => {
        if (res.ok) handleRedirect();

        return res.json();
      })
      .then(data => {
        // 에러 분기처리
      });
  };

  return (
    <Modal
      title="회원가입"
      subTitle="Default에 오신 것을 환영합니다."
      redirectText="로그인"
      redirectLabel="이미 계정이 있으신가요?"
      handleRedirect={handleRedirect}
      onClose={onClose}
    >
      <div className="modalContent">
        <form
          className="registerModalInputBox"
          onChange={handleInputChange}
          onSubmit={handleRegister}
        >
          <div className="registerInputBox">
            <input className="modalInput" type="text" id="name" value={name} />
            <label className={`modalLabel ${name ? 'top' : ''}`} htmlFor="name">
              Name
            </label>
          </div>

          <div className="registerInputBox">
            <input
              className="modalInput"
              type="text"
              id="email"
              value={email}
            />
            <label
              className={`modalLabel ${email ? 'top' : ''}`}
              htmlFor="email"
            >
              Email
            </label>
          </div>

          <div className="registerInputBox">
            <input
              className="modalInput"
              type="password"
              id="password"
              value={password}
            />
            <label
              className={`modalLabel ${password ? 'top' : ''}`}
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <Button text="계속" disabled={!isValid} />
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
