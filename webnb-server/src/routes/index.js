const express = require("express");
const { userRouter } = require("./user.router");
const { paymentRouter } = require("./payment.router");
const { reservationRouter } = require("./reservation.router");

const routes = express.Router();
const roomRouter = require("./room.router");
const { detailRouter } = require("./roomdetail.routes");

routes.use("/rooms", roomRouter);

routes.use("/user", userRouter);
routes.use("/reservation", reservationRouter);
routes.use("/payment", paymentRouter);
routes.use("/detail",detailRouter);

module.exports = { routes };
