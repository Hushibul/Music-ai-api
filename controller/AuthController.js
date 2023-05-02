const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

//Login Controller
const loginAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(305)
        .json({ success: false, message: "Invalid email or password" });
    } else {
      const matchedPassword = await bcrypt.compare(password, user.password);

      if (!matchedPassword) {
        res
          .status(304)
          .json({ success: false, message: "Invalid email or password" });
      } else {
        const token = jwt.sign(
          { _id: user._id, name: user.name, isAdmin: user.isAdmin },
          process.env.JWT,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).json({ success: true, name: user.name, token: token });
      }
    }
  } catch (err) {
    // res.status(500).json({ error: err.message });

    next(err);
  }
};

//Register Controller
const registerAuth = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(306).json({
        success: false,
        message: "Please provide all the required fields",
      });
    } else {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        res
          .status(400)
          .json({ success: false, message: "Email is already in use" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign(
          { _id: user._id, name: user.name, isAdmin: user.isAdmin },
          process.env.JWT,
          {
            expiresIn: "1d",
          }
        );

        res.status(201).json({ success: true, name: user.name, token: token });
      }
    }
  } catch (err) {
    // res.status(500).json({ error: err.message });
    next(err);
  }
};

module.exports = { loginAuth, registerAuth };
