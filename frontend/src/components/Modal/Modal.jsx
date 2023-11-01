import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ModalSocialLogin from './ModalSocialLogin';
import './Modal.scss';

const Modal = ({
  children,
  title,
  subTitle,
  redirectText,
  redirectLabel,
  onClose,
  handleRedirect,
}) => {
  const [isHost, setIsHost] = useState(false);

  const handleCheckboxChange = e => {
    const { checked } = e.target;
    setIsHost(checked);

    fetch('http://10.58.52.103:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(isHost),
    })
      .then(res => res.json())
      .then(data => console.log('결과: ', data));
  };

  return (
    <div className="modalContainer black" onClick={onClose}>
      <div className="modalContentContainer" onClick={e => e.stopPropagation()}>
        <header className="modalHeader">
          <button className="modalCloseButton">
            <IoMdClose size={18} onClick={onClose} />
          </button>
          <p className="modalTitle">{title}</p>
        </header>
        <div className="modalBody">
          <div className="modalBodyTitleBox">
            <div className="modalSubTitle">{subTitle}</div>
            <div className="hostBox">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                id="host"
              />
              <label htmlFor="host">호스트로 로그인</label>
            </div>
          </div>
          {children}
        </div>
        <div className="modalFooter">
          <div className="divider">또는</div>
          <ModalSocialLogin />
          <div className="footerTextBox">
            <p>{redirectLabel}</p>
            <div onClick={handleRedirect} className="footerText">
              {redirectText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
