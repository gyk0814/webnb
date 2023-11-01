import React, { useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { formatDate } from '../../utils/formatDate';
import './ReservationBox.scss';

const ReservationBox = forwardRef(
  (
    {
      setIsCalendarOpen,
      selectedStartDate,
      selectedEndDate,
      calculatedNights,
      averageRatings,
      reviewData,
      detail,
      roomId,
    },
    ref,
  ) => {
    const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 });

    const navigate = useNavigate();

    const handleMouseMove = event => {
      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;

      setGradientPosition({ x, y });
    };

    const handleCalendarOpen = () => {
      setIsCalendarOpen(prev => !prev);
    };

    const handleReservationSubmit = e => {
      e.preventDefault();
    };

    const price = detail.price;
    const pricePerNight = price?.toLocaleString();
    const commission = 27000;

    const totalPrice = () => {
      if (!selectedStartDate || !selectedEndDate) {
        return 0;
      }
      return price * calculatedNights;
    };

    const handleReservation = () => {
      navigate({
        pathname: '/payment/list',
        search: `?startDate=${formatDate(selectedStartDate)}&roomId=${roomId}`,
      });

      fetch('http://localhost:3002/payment/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(),
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            navigate({
              pathname: '/payment/list',
              search: `?startDate=${selectedStartDate}&roomId=${roomId}`,
            });
          }
        });
    };

    return (
      <div className="reservationContainer">
        <div className="reservationHeader">
          <p className="priceBox">
            <b className="price">￦{pricePerNight}</b>
            <span className="night">/ 박</span>
          </p>
          <div className="rating">
            <AiFillStar />
            <p>{averageRatings}</p>
            <p className="ratingReview">후기 {reviewData.length}개</p>
          </div>
        </div>
        <div className="reservationBody">
          <form className="checkDateBox" onSubmit={handleReservationSubmit}>
            <button
              className="checkDate"
              onClick={handleCalendarOpen}
              ref={ref}
            >
              <div>
                <p>체크인</p>
                <p>
                  {selectedStartDate
                    ? selectedStartDate.toLocaleDateString()
                    : '날짜 선택'}
                </p>
              </div>
              <div>
                <p>체크아웃</p>
                <p>
                  {selectedEndDate
                    ? selectedEndDate.toLocaleDateString()
                    : '날짜 선택'}
                </p>
              </div>
            </button>
            <button
              className="reserveBtn"
              onClick={handleReservation}
              onMouseMove={handleMouseMove}
              style={{
                background: `radial-gradient(circle at ${gradientPosition.x}px ${gradientPosition.y}px, #FF385C, #E61E4D, #E31C5F, #D70466, #BD1E59, #BD1E59)`,
              }}
            >
              예약하기
            </button>
          </form>
          <p className="subText">예약 확정 전에는 요금이 청구되지 않습니다.</p>
          <div className="reservationInfoBox">
            <div className="reservationInfo">
              <p>
                ￦{pricePerNight} x {calculatedNights}박
              </p>
              <p>￦{totalPrice().toLocaleString()}</p>
            </div>
            <div className="reservationInfo">
              <p>에어비앤비 서비스 수수료</p>
              <p>￦{commission.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="reservationFooter">
          <p>총 합계</p>
          <p>￦{(totalPrice() + commission).toLocaleString()}</p>
        </div>
      </div>
    );
  },
);

export default ReservationBox;
