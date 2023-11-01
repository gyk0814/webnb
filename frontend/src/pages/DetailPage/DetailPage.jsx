import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { GiTowel } from 'react-icons/gi';
import Calendar from '../../components/Calendar/Calendar';
import ReservationBox from '../../components/Detail/ReservationBox';
import useOutsideClick from '../../hooks/useClickOutside';
import Review from '../../components/Detail/Review';
import './DetailPage.scss';

const DetailPage = () => {
  const [detail, setDetail] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const calendarRef = useRef();
  const dateSelectRef = useRef();
  const { id } = useParams();

  const averageRatings = (
    reviewData.reduce((acc, cur) => acc + cur.ratings, 0) / reviewData.length
  ).toFixed(2);

  useOutsideClick(
    calendarRef,
    () => {
      setIsCalendarOpen(false);
    },
    dateSelectRef,
  );

  useEffect(() => {
    fetch(`http://10.58.52.234:3000/detail/details/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        localStorage.getItem('accessToken');
        setDetail(data[0]);
      });
  }, []);

  const {
    title,
    imageUrl,
    name,
    guestsCount,
    bedroomsCount,
    profileImage,
    wifiBoolean,
    bathroomsCount,
    airConditioningCount,
    roomDescription,
    locationName,
  } = detail;

  const calculateNights = () => {
    if (!selectedStartDate || !selectedEndDate) {
      return 0;
    }

    const timeDiff = selectedEndDate - selectedStartDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return Math.floor(daysDiff);
  };

  // if (Object.keys(detail).length === 0) return null;

  return (
    <div className="detail">
      <div className="detailContainer">
        <div className="detailHeader">
          <div className="title">{title}</div>
        </div>
        <div className="detailImageBox">
          {imageUrl?.map(image => (
            <img
              key={image.id}
              className="detailImage"
              src={image}
              alt="상세"
            />
          ))}
        </div>
        <div className="detailContentBox">
          <div className="hostInfo">
            <div className="hostInfoHeaderBox">
              <div className="hostInfoHeader">
                <h1 className="title">{name}</h1>
                <p className="subtitle">
                  <span>최대 인원 {guestsCount}명</span>
                  <span>침실 {bedroomsCount}개</span>
                  <span>wifi {wifiBoolean ? '있음' : '없음'}</span>
                  <span>욕실 {bathroomsCount}개</span>
                  <span>에어컨 {airConditioningCount}개</span>
                </p>
              </div>
              <img src={profileImage} alt="프로필" />
            </div>
            <div className="itemInfo">
              <div className="infoIcon">
                <AiFillCheckCircle size={30} />
                <p className="infoIconText">셀프 체크인</p>
              </div>
              <div className="infoIcon">
                <AiFillCheckCircle size={30} />
                <p className="infoIconText">{name}님은 슈퍼호스트입니다</p>
              </div>
              <div className="infoIcon">
                <AiFillCheckCircle size={30} />
                <p className="infoIconText">
                  8월 26일 오후 12:00 전까지 무료로 취소하실 수 있습니다.
                </p>
              </div>
            </div>
            <div className="description">
              <p>{roomDescription}</p>
            </div>
            <div className="place">
              <h1 className="title">숙박 장소</h1>
              <div className="placeInfoContent">
                <BiBed size={30} />
                <p className="contentTitle">침실</p>
                <p className="contentDetail">퀸사이즈 침대 {bedroomsCount}개</p>
              </div>
            </div>
            <div className="convenient">
              <h1 className="title">숙소 편의시설</h1>
              <div className="contentIcon">
                <GiTowel size={30} />
                <p>
                  <b>필수 품목</b>
                </p>
                <span>{detail.amenities ? '있음' : '없음'}</span>
              </div>
            </div>
            <div className="calendarReservation">
              <h1 className="title">
                {locationName}에서 {calculateNights()}박
              </h1>
              <Calendar
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedEndDate={setSelectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
              />
            </div>
          </div>
          <div className="paymentContainer">
            <ReservationBox
              calculatedNights={calculateNights()}
              setIsCalendarOpen={setIsCalendarOpen}
              selectedStartDate={selectedStartDate}
              averageRatings={averageRatings}
              selectedEndDate={selectedEndDate}
              reviewData={reviewData}
              detail={detail}
              roomId={id}
              ref={dateSelectRef}
            />
            <div className="reservationCalendarBox" ref={calendarRef}>
              {isCalendarOpen && (
                <Calendar
                  className="calendarModal"
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  setSelectedEndDate={setSelectedEndDate}
                  setSelectedStartDate={setSelectedStartDate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Review
        reviewData={reviewData}
        setReviewData={setReviewData}
        averageRatings={averageRatings}
      />
    </div>
  );
};

export default DetailPage;
