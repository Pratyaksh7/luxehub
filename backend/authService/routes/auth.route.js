const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router()
router.get("/ping", authController.Ping)
router.post('/signup', authController.Signup)
router.post('/signin', authController.Signin)

module.exports = router;