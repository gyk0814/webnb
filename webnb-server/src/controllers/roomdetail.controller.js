const roomdetailService = require('../services/roomdetail.service'); 
const { catchAsync } = require("../utilities/errorHandle");

const detailroom =catchAsync(async (req, res) => {
const roomId = req.params.roomId;
const detailroom = await roomdetailService.detailroom(roomId);
  res.status(201).json(detailroom);
  });

 const roomreview = catchAsync(async (req, res) => {
    const roomId = req.params.roomId;
    const roomreview = await roomdetailService.roomreview(roomId);
    res.status(201).json(roomreview);
  });


const createreviews = catchAsync(async (req, res) => {
    const {userId, content, ratings }= req.body;
    const roomId = req.params.roomId
     await roomdetailService.createreviews(userId,roomId,content,ratings);
    res.status(201).json({message : "review created"})
  });

module.exports = { detailroom ,roomreview,createreviews};
