const express = require("express");

const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/signin", userController.signIn);
userRouter.post("/signup", userController.signUp);

module.exports = { userRouter };
