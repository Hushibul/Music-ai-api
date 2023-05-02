const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ success: false, message: "Token is not valid!" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }
  } catch (err) {
    next(err);
  }
};

const verifyTokenAndAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
          res
            .status(403)
            .json({ success: false, message: "Token is not valid!" });
        } else {
          req.user = user;
          console.log(req.user);
          if (req.user.isAdmin) {
            next();
          } else {
            res
              .status(403)
              .json({
                success: false,
                message: "Only admin is allowed to do this!",
              });
          }
        }
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "You are not authorized!" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyToken, verifyTokenAndAdmin };
