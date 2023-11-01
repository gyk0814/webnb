import React from 'react';
import { AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';
import { IoEarth } from 'react-icons/io5';
import { FaInstagramSquare } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerContentContainer">
        <div className="menuInfo">
          <div className="menuInfoItem">
            <h3>위비앤비 지원</h3>
            <p>도움말 센터</p>
            <p>위커버</p>
            <p>차별 철폐를 위한 노력</p>
            <p>장애인 지원</p>
            <p>예약 취소 옵션</p>
            <p>이웃 민원 신고</p>
          </div>
          <div className="menuInfoItem">
            <h3>호스팅</h3>
            <p>당신의 공간을 위비앤비하세요</p>
            <p>호스트를 위한 위커버</p>
            <p>호스팅 자료</p>
            <p>커뮤니티 포럼</p>
            <p>책임감 있는 호스팅</p>
          </div>
          <div className="menuInfoItem">
            <h3>위비앤비</h3>
            <p>뉴스룸</p>
            <p>새로운 기능</p>
            <p>채용정보</p>
            <p>투자자 정보</p>
            <p>Webnb.org</p>
          </div>
        </div>
        <div className="footerMiddle">
          <div className="left">
            <p>© 2023 Webnb, Inc</p>
            <p>개인정보 처리방침</p>
            <p>이용약관</p>
            <p>사이트맵</p>
            <p>한국의 변경된 환불 정책</p>
            <p>회사 세부정보</p>
          </div>
          <div className="right">
            <IoEarth size={22} />
            <p>한국어 (KR)</p>
            <p>₩ KRW</p>
            <AiFillFacebook size={22} />
            <AiFillTwitterSquare size={22} />
            <FaInstagramSquare size={22} />
          </div>
        </div>
        <div className="footerBottom">
          <p className="bottomText">
            웹사이트 제공자: Webnb Ireland UC, private unlimited company, 8
            Hanover Quay Dublin 2, D02 DP23 Ireland | 이사: 이인재, 박건률,
            김도윤, 권영경, 임홍규 | VAT 번호: IE9827384L | 사업자 등록 번호: IE
            511825 | 연락처: terms@webnb.com, 웹사이트, 080-822-0230 | 호스팅
            서비스 제공업체: 아마존 웹서비스 | 위비앤비는 통신판매 중개자로
            위비앤비 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는
            통신판매의 당사자가 아닙니다. 위비앤비 플랫폼을 통하여 예약된 숙소,
            체험, 호스트 서비스에 관한 의무와 책임은 해당 서비스를 제공하는
            호스트에게 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
