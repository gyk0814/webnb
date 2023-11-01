const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userDao = require("../models/user.dao");

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const err = new Error("Invalid User");
    err.statusCode = 404;
    throw err;
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    const err = new Error("Invalid Password");
    err.statusCode = 401;
    throw err;
  }

  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

const { validateEmail } = require("../utilities/validator");

const signUp = async (name, email, password) => {
  validateEmail(email);

  const user = await userDao.getUserByEmail(email);

  if (user) {
    const err = new Error("duplicated email");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userDao.createUser(name, email, hashedPassword);
};

module.exports = { signUp, signIn };
