const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Authenticate = async (req, res, next) => {
  try {
    const token = req.header.jwtoken;
    console.log(token);
    const verifyToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

    const rootUser = await User.findOne({
      id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User not Found");
    }
    console.log(req.params);
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized: No token provided");
    console.log(error);
  }
};
module.exports = Authenticate;
