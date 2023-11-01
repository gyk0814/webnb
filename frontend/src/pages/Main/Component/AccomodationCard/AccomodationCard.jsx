import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccomodationCard.scss';

const AccomodationCard = ({ data }) => {
  const [cardIdx, setCardIdx] = useState(0);
  const navigate = useNavigate();

  const { roomId, images, roomTitle, ratings, price } = data;

  const swipeImgToPrev = e => {
    e.stopPropagation();

    if (cardIdx <= 0) return;

    setCardIdx(prev => prev - 1);
  };

  const swipeImgToNext = e => {
    e.stopPropagation();

    if (cardIdx >= images.length - 1) return;

    setCardIdx(prev => prev + 1);
  };

  const dotWrapperPos =
    // eslint-disable-next-line no-nested-ternary
    cardIdx > 2
      ? cardIdx > images.length - 4
        ? images.length - 5
        : cardIdx - 2
      : 0;

  return (
    <div
      className="accomodationCard"
      onClick={() => navigate(`/detail/${roomId}`)}
    >
      <div className="imgContainer">
        <div
          className="imgWrapper"
          style={{ transform: `translateX(calc(-${cardIdx} * 100%)` }}
        >
          {images.map(url => (
            <img key={url} src={url} alt={roomTitle} />
          ))}
        </div>
        {images.length > 1 && (
          <>
            <div className="swipeBtnWrapper">
              <div className="swipeBtn" onClick={swipeImgToPrev}>
                &lt;
              </div>
              <div className="swipeBtn" onClick={swipeImgToNext}>
                &gt;
              </div>
            </div>
            <div className="dotIndicatorContainer">
              <div
                className="dotIndicatorWrapper"
                style={{
                  transform: `translateX(calc(-${dotWrapperPos} * 11px)`,
                }}
              >
                {images.map((el, idx) => (
                  <span
                    key={el}
                    className={`dotIndicator${
                      idx === cardIdx ? ' current' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="infoContainer">
        <div className="titleWrapper">
          <div className="boldText">{roomTitle}</div>
          <div className="ratingWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: 'block',
                height: '12px',
                width: '12px',
                fill: 'currentcolor',
              }}
            >
              <path
                fill-rule="evenodd"
                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
              />
            </svg>
            <span>{ratings}</span>
          </div>
        </div>
        <p className="price">
          <span className="boldText">₩{price.toLocaleString()}</span>
          <span> /박</span>
        </p>
      </div>
    </div>
  );
};

export default AccomodationCard;
