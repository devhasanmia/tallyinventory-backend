import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

// Create: create Unit
router.post("/create-user", UserController.createUser);
router.post("/auth/login", UserController.login)

export const UserRoutes = router;