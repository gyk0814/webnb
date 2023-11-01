const express = require("express");

const paymentController = require("../controllers/payment.controller");
const paymentRouter = express.Router();

const { loginRequired } = require("../utilities/auth");

paymentRouter.get("/list", loginRequired, paymentController.getPaymentList);
paymentRouter.put("/paid", loginRequired, paymentController.putPaid);
module.exports = { paymentRouter };
