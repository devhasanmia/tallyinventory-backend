import express from "express";
import { UserController } from "./user.controller";
import authenticate from "../../middlewares/authenticate";
import { loginLimiter } from "../../utils/loginLimiter";
const router = express.Router();

// Create: create Unit
router.post("/create-user", authenticate("Business Owner", "Sales Executive"), UserController.createUser);
router.post("/auth/login", loginLimiter, UserController.login);
router.post("/auth/verify-otp", authenticate("Business Owner", "Sales Executive"), loginLimiter, UserController.verifyOTP);

export const UserRoutes = router;
