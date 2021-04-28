const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const accessTokenExpires = 3600 * 24 * 7;
const refreshTokenExpires = 3600 * 24 * 7;

const createToken = (id, expiresTime) => {
  return jwt.sign({ id }, "newone", {
    expiresIn: expiresTime,
  });
};

const generateAuthToken = async (user) => {
  const token = createToken(user.id, accessTokenExpires);
  const refreshtoken = createToken(user.id, refreshTokenExpires);
  return { accesstoken: token, refreshToken: refreshtoken };
};

const register = async (req, res) => {
  const { name, email, password, slogan } = req.body;
  try {
    const user = await User.create({ name, email, password, slogan });
    const token = await generateAuthToken(user);
    res.status(201).json({ user, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = await generateAuthToken(user);
    res.status(201).json({ user, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send("error, cannot find account");
  }
};

const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "newone", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};

module.exports = {
  register,
  login,
  authenticateToken,
};
