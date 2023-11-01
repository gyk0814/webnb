export const formatDate = review => {
  const reviewDate = new Date(review).toLocaleDateString().split('');
  reviewDate.pop();
  const formattedReviewDate = reviewDate
    .join('')
    .replaceAll('.', '-')
    .replaceAll(' ', '');
  return formattedReviewDate;
};

export const formatDateToKorean = payment => {
  const paymentDate = payment?.split('-');
  paymentDate.splice(1, 0, '년');
  paymentDate.splice(3, 0, '월');
  paymentDate.splice(5, 0, '일');
  paymentDate.splice(2, 0, ' ');
  paymentDate.splice(5, 0, ' ');

  const formattedPaymentDate = paymentDate.join('');

  return formattedPaymentDate;
};

export const foramtDateInterval = (startDate, endDate) => {
  const interval =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (24 * 60 * 60 * 1000);

  const formattedInterval = Math.round(interval);

  return formattedInterval;
};
