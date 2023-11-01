import React, { useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import useOutsideClick from '../../hooks/useClickOutside';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import Avatar from './Avatar';
import UserMenuItem from './UserMenuItem';
import './UserMenu.scss';

const UserMenu = () => {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const [modalStatus, setModalStatus] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef();
  const exceptionRef = useRef();

  const MODAL_MAP = {
    login: (
      <LoginModal
        setIsLoggedIn={setIsLoggedIn}
        onClose={() => setModalStatus('')}
        handleRedirect={() => setModalStatus('register')}
      />
    ),
    register: (
      <RegisterModal
        onClose={() => setModalStatus('')}
        handleRedirect={() => setModalStatus('login')}
      />
    ),
  };

  const handleToggleUserMenu = () => {
    setIsToggleMenu(prev => !prev);
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  useOutsideClick(
    menuRef,
    () => {
      setIsToggleMenu(false);
    },
    exceptionRef,
  );

  return (
    <>
      {MODAL_MAP[modalStatus]}
      <div
        className="iconBox"
        onClick={handleToggleUserMenu}
        ref={exceptionRef}
      >
        <AiOutlineMenu />
        <div className="avatarIcon">
          <Avatar />
        </div>
      </div>
      {isLoggedIn && isToggleMenu ? (
        <div className="menuListBox">
          <UserMenuItem
            className="menuList"
            text="로그아웃"
            onClick={() => {
              handleLogOut();
            }}
          />
        </div>
      ) : (
        isToggleMenu && (
          <div className="menuListBox">
            <UserMenuItem
              className="menuList"
              text="로그인"
              onClick={() => setModalStatus('login')}
            />
            <UserMenuItem
              className="menuList"
              text="회원가입"
              onClick={() => setModalStatus('register')}
            />
          </div>
        )
      )}
    </>
  );
};

export default UserMenu;
