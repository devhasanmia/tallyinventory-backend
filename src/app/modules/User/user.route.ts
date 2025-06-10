import express from "express";
import { UserController } from "./user.controller";
import { loginLimiter } from "../../utils/loginLimiter";
import otpAuth from "../../middlewares/otpAuth";
import { authenticate } from "../../middlewares/authenticate";
const router = express.Router();

// Create: create Unit
router.post("/create-user", UserController.createUser);
router.post("/auth/login", loginLimiter, UserController.login);
router.post("/auth/verify-otp", otpAuth(), loginLimiter, UserController.verifyOTP);
router.get("/auth/get-user", authenticate("Business Owner", "Sales Executive"), UserController.getUser);

export const UserRoutes = router;
