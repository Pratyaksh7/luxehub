import express from "express";
import * as authController from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/ping", authController.Ping);
router.post('/signup', authController.Signup);
router.post('/signin', authController.Signin);
export default router;
