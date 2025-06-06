import express from "express";
import { UserController } from "./user.controller";
import authenticate from "../../middlewares/authenticate";
const router = express.Router();

// Create: create Unit
router.post("/create-user", UserController.createUser);
router.post("/auth/login", UserController.login);
router.post("/auth/verify-otp", authenticate(), UserController.verifyOTP);

export const UserRoutes = router;
