import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { foramtDateInterval, formatDateToKorean } from '../../utils/formatDate';
import './Payment.scss';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      'http://localhost:3002/payment/list?userId=2&roomId=2&startDate=2023-09-15',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
      .then(res => res.json())
      .then(data => setPaymentData(data.paymentList[0]));
  }, []);

  const isEmpty = Object.keys(paymentData).length === 0;

  if (isEmpty) return null;

  const { point, title, price, thumbNail, ratings, startDate, endDate } =
    paymentData;

  const commission = 27000;
  const totalWithOutCommission = price * foramtDateInterval(startDate, endDate);
  const totalPrice =
    price * foramtDateInterval(startDate, endDate) + commission;

  const handlePayment = () => {
    fetch(
      `http://localhost:3002/payment/paid?userId=2&roomId=2&startDate=2023-09-15&price=${totalPrice}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data) {
          navigate('/paydone');
        }
      });
  };

  return (
    <div className="paymentPageContainer">
      <div className="header">
        <h1>확인 및 결제</h1>
      </div>
      <div className="contentContainer">
        <div className="reservationBox">
          <div className="reservationInfo">
            <h1 className="title">예약 정보</h1>
            <div className="dateBox">
              <h2>날짜</h2>
              <p>
                {formatDateToKorean(startDate)} ~ {formatDateToKorean(endDate)}
              </p>
            </div>
          </div>
          <div className="pay">
            <h1 className="title">결제</h1>
            <div className="pointBox">
              <div className="pointBoxContent">
                <h2>총 포인트</h2>
                <p>{point.toLocaleString()}포인트</p>
              </div>
              <div className="pointBoxContent">
                <h2>사용 포인트</h2>
                <p>-{totalPrice.toLocaleString()}포인트</p>
              </div>
              <div className="pointBoxContent">
                <h2>잔여 포인트</h2>
                <p>{(point - totalPrice).toLocaleString()}포인트</p>
              </div>
            </div>
          </div>
          <div className="reserveBtnBox">
            <button className="reserveBtn" onClick={handlePayment}>
              결제 요청
            </button>
          </div>
        </div>
        <div className="detailInfo">
          <div className="placeInfoBox">
            <img src={thumbNail} alt="장소" className="placeImage" />
            <div className="placeInfo">
              <h1>{title}</h1>
              <p className="ratings">
                <AiFillStar />
                {ratings.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="priceInfoContainer">
            <h1 className="title">요금 세부정보</h1>
            <div className="priceInfoBox">
              <div className="priceInfo">
                <p>
                  ￦{price.toLocaleString()} x{' '}
                  {foramtDateInterval(startDate, endDate)}박
                </p>
                <p>￦{totalWithOutCommission}</p>
              </div>
              <div className="priceInfo">
                <p>에어비앤비 서비스 수수료</p>
                <p>￦{commission.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="totalPriceInfoBox">
            <h2 className="title">총 합계</h2>
            <p>￦{totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
