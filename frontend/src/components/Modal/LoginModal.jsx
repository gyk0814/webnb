import React, { useState } from 'react';
import { emailPattern } from '../../utils/constant';
import Button from '../Button/Button';
import Modal from './Modal';
import './LoginModal.scss';

const LoginModal = ({ onClose, handleRedirect, setIsLoggedIn }) => {
  const [loginUserInfo, setLoginUserInfo] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginUserInfo;
  const isEmailIsValid = emailPattern.test(email);
  const isPasswordIsValid = password.length >= 5;
  const isValid = isEmailIsValid && isPasswordIsValid;

  const handleLogin = e => {
    e.preventDefault();
    setIsLoggedIn(true);
    onClose();

    fetch('http://10.58.52.103:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(loginUserInfo),
    })
      .then(res => res.json())
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          setIsLoggedIn(true);
          onClose();
        }
      });
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setLoginUserInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Modal
      title="로그인"
      subTitle="다시 오신 것을 환영합니다."
      redirectText="회원가입"
      redirectLabel="아직 회원이 아니십니까?"
      handleRedirect={handleRedirect}
      onClose={onClose}
    >
      <div className="modalContent">
        <form
          className="loginModalInputBox"
          onChange={handleInputChange}
          onSubmit={handleLogin}
        >
          <div className="loginInputBox ">
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

          <div className="loginInputBox ">
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

export default LoginModal;
