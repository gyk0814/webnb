import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Button from '../Button/Button';
import './ModalSocialLogin.scss';

const move = url => {
  window.location.href = url;
};

const auth = async () => {
  await fetch('', {
    method: 'POST',
  })
    .then(res => res.json())
    .then(data => {
      move(data.url);
    });
};

const ModalSocialLogin = () => {
  return (
    <div className="modalSocialLoginBox">
      <div className="googleSocialButtonBox">
        <FcGoogle size={25} className="googleImage" />
        <Button text="구글로 로그인하기" onClick={() => auth()} />
      </div>
      <div className="kakaoSocialButtonBox">
        <RiKakaoTalkFill size={25} className="kakaoImage" />
        <Button text="카카오로 로그인하기" />
      </div>
    </div>
  );
};

export default ModalSocialLogin;
