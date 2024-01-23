const User = require("../models/User");
const bcrypt = require("bcrypt");
const AuthError = require("../errors/AuthError");
const { sendForgotPasswordEmail } = require("../mails");
const { logger } = require("../utils/logger");
const { BASE_URL } = require("../config/server");
const { signAccessToken,signRefreshToken,signEmailToken } = require("../utils/jwt");
const jwt = require('jsonwebtoken');
const {EXPIRE_IN, SECRET} = require("../config/jwt");

const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  let user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const accessToken = await signAccessToken(user._id);

  const refreshToken = await signRefreshToken(user._id);

  return { ...user._doc, accessToken, refreshToken };
};

const loginUser = async (data) => {
  let user = await User.findOne({ email: data.email });

  if (empty(user)) {
    throw new AuthError();
  }

  const passwordMatched = await bcrypt.compare(data.password, user.password);

  if (!passwordMatched) {
    throw new AuthError();
  }

  const accessToken = await signAccessToken(user._id);

  const refreshToken = await signRefreshToken(user._id);

  return { ...user._doc, accessToken ,refreshToken};
};

const getUserDetail = async (_id) => {
  return await User.findById(_id);
};

const getUsers = async (id) => {
  return await User.find();
};

const forgetPassword = async (email) => {
  const token = signEmailToken(email);
  let data = {
    pageTitle: "Forget Password",
    token: token,
    reset_password_url: BASE_URL + "api/auth/reset/password",
  };

  sendForgotPasswordEmail(email, data)
    .then((res) => {})
    .catch((e) => {
      logger.error(e);
    });

  return true;
};

const resetPassword = async (email, password) => {
  let user = await User.findOne({ email });

  user.password = await bcrypt.hash(password, 10);

  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetail,
  getUsers,
  forgetPassword,
  resetPassword,
};
