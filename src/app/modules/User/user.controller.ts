import { RequestHandler } from "express";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const createUser: RequestHandler = async (req, res, next) => {
    try {
        const data = await UserService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}

const login: RequestHandler = async (req, res, next) => {
    try {
        const data = await UserService.login(req.body);
        res.status(201).json({
            success: true,
            message: "User Login successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}

const verifyOTP: RequestHandler = async (req, res, next) => {
    try {
        const data = await UserService.verifyOTP(req.user as any, req.body);
        res.status(201).json({
            success: true,
            message: "User Login successfully",
            data
        });
    } catch (error) {
        next(error)
    }
}

export const UserController = {
    createUser,
    login,
    verifyOTP
}