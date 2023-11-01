const express = require("express");
const detailRouter = express.Router();


const roomdetailController = require("../controllers/roomdetail.controller");


detailRouter.get("/detail/:roomId", roomdetailController.detailroom);

detailRouter.get("/content/:roomId", roomdetailController.roomreview);

detailRouter.post("/writing/:roomId", roomdetailController.createreviews);

module.exports = { detailRouter };