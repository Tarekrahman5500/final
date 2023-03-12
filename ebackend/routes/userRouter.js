const express = require('express');
const {registerUser, loginUser, logout, forgotPassword} = require("../controllers/userController");
const router = express.Router();

/* GET users listing. */
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(forgotPassword)
module.exports = router;
