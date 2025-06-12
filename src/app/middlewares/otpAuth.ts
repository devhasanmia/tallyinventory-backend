import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      otpAuth: {
        email: string;
      };
    }
  }
}

const otpAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Unauthorized access");
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;
      req.otpAuth = {
        email: decoded.email,
      };
      next();
    } catch (error) {
      if (error instanceof AppError) {
        next(error);
      } else {
        next(new AppError(401, "Invalid or expired token"));
      }
    }
  };
};

export default otpAuth;
