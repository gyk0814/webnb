const roomdetaildao = require('../models/roomdetail.dao');

const detailroom = async (roomId) => {
  await roomdetaildao.getDetail(roomId)
  return detail;
}

const roomreview = async (roomId) => {
  await roomdetaildao.roomreview(roomId)
  return review;
}

const createreviews = async (userId, roomId, content, ratings) => {
  await roomdetaildao.createreviews(userId, roomId, content, ratings);
  return create;
};

module.exports = { detailroom, roomreview, createreviews };