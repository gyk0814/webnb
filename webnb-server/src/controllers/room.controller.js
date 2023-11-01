const roomService = require("../services/room.service");
const { catchAsync } = require("../utilities/errorHandle");

const getRoomList = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { categoryId, locationId, page, limit, sortBy, minPrice, maxPrice } =
    req.query;
  const rooms = await roomService.getRoomList(
    userId,
    categoryId,
    locationId,
    page,
    limit,
    sortBy,
    minPrice,
    maxPrice
  );
  res.status(200).json({ data: rooms });
});

module.exports = { getRoomList };
