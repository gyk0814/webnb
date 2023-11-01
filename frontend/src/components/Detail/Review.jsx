import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { formatDate } from '../../utils/formatDate';
import useOutsideClick from '../../hooks/useClickOutside';
import StarRating from '../Detail/StarRating';
import ReviewItem from '../Detail/ReviewItem';
import WriteReviewModal from './WriteReviewModal';
import './Review.scss';

const Review = ({ reviewData, setReviewData, averageRatings }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const modalRef = useRef();
  const reviewBtnRef = useRef();
  const { id } = useParams();

  const handleOpenWriteReviews = () => {
    setIsReviewOpen(true);
  };

  const handleReviewSubmit = review => {
    fetch(`http://10.58.52.234:3000/detail/writing/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ratings: review.ratings,
        content: review.content,
        userId: 13,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'review created') {
          getReview();
          setIsReviewOpen(false);
        }
      });
  };

  const getReview = () => {
    fetch(`http://10.58.52.234:3000/detail/content/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(result => {
        setReviewData(result);
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  useOutsideClick(
    modalRef,
    () => {
      setIsReviewOpen(false);
    },
    reviewBtnRef,
  );

  return (
    <div className="review">
      <div className="reviewHeader">
        <div className="reviewInfo">
          <AiFillStar size={22} />
          <p>{averageRatings}</p>
          <p>후기 {reviewData.length}개</p>
        </div>
        <button
          className="writeReviewBtn"
          onClick={handleOpenWriteReviews}
          ref={reviewBtnRef}
        >
          후기 작성
        </button>
        {isReviewOpen && (
          <WriteReviewModal
            ref={modalRef}
            reviewData={reviewData}
            onReviewSubmit={handleReviewSubmit}
            onClose={() => setIsReviewOpen(false)}
          />
        )}
      </div>
      <div className="reviewContent">
        {reviewData.length === 0 ? (
          <p>아직 후기가 없습니다.</p>
        ) : (
          reviewData.map(reviews => (
            <div key={reviews.id} className="reviewList">
              <StarRating
                ratingIndex={reviews.ratings}
                setRatingIndex={() => {}}
              />
              <ReviewItem
                name={reviews.name}
                profileImage={reviews.profileImage}
                date={formatDate(reviews.createdAt)}
                text={reviews.content}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;
