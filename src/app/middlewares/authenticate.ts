import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/AppError";
import config from "../config";
import { TDesignation } from "../modules/User/user.type";
import Session from "../modules/Session/session.model";
import { DeviceDetectorResult } from "device-detector-js";
import deviceInfoMiddleware from "../utils/detectDevice";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        email: string;
        designation?: TDesignation;
        iat?: number;
        exp?: number;
      };
      deviceInfo?: DeviceDetectorResult;
    }
  }
}

const authenticate = (...allowedDesignations: TDesignation[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Unauthorized access");
      }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;
      const currentUserDesignation = decoded.designation as TDesignation;
      if (allowedDesignations.length && !allowedDesignations.includes(currentUserDesignation)) {
        throw new AppError(403, "You do not have access to this route");
      }
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        designation: currentUserDesignation,
        iat: decoded.iat,
        exp: decoded.exp,
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

export default authenticate;
