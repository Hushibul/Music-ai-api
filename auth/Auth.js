const express = require("express");

const { loginAuth, registerAuth } = require("../controller/AuthController");

const router = express.Router();

//Login
router.post("/login", loginAuth);

//Register
router.post("/register", registerAuth);

module.exports = router;
