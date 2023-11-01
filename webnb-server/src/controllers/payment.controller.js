const paymentService = require("../services/payment.service");
const { catchAsync } = require("../utilities/errorHandle");

const getPaymentList = catchAsync(async (req, res) => {
  const { roomId, startDate, offset, limit } = req.query;
  const user = req.user;
  const userId = user.id;
  const paymentList = await paymentService.paymentList(
    userId,
    roomId,
    startDate,
    offset,
    limit
  );

  res.status(200).json(paymentList);
});
const putPaid = catchAsync(async (req, res) => {
  const { roomId, startDate, price } = req.query;
  const user = req.user;
  const userId = user.id;
  await paymentService.paid(userId, roomId, startDate, price);

  res.status(200).json({ message: "Pay Completed" });
});
module.exports = { getPaymentList, putPaid };
