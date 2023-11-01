const paymentDao = require("../models/payment.dao");

const paymentList = async (userId, roomId, startDate, offset, limit) => {
  return await paymentDao.paymentlist(userId, roomId, startDate, offset, limit);
};

const paid = async (userId, roomId, startDate, price) => {
  const getCheckPrice = await paymentDao.checkPrice(userId);
  const { point } = getCheckPrice;
  const parseIntPoint = parseInt(point);
  if (parseIntPoint < price) {
    const err = new Error("Not enough point");
    err.statusCode = 202;
    throw err;
  } else {
    await paymentDao.paid(userId, roomId, startDate, price);
  }
};
module.exports = { paymentList, paid };
