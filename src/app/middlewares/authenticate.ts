import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import config from "../config";
import { TDesignation } from "../modules/User/user.type";

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
    }
  }
}

const authenticate = (...allowedDesignations: TDesignation[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new AppError(401, "You are not authorized");
      }
      const token = authorizationHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;
      const currentUserDesignation = decodedToken.designation as TDesignation;
      if (allowedDesignations.length && !allowedDesignations.includes(currentUserDesignation)) {
        throw new AppError(403, "You have no access to this route");
      }
      req.user = {
        userId: decodedToken.userId,
        email: decodedToken.email,
        designation: currentUserDesignation,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
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
