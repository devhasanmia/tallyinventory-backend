import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}

const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(" ")[1];

      if (!token) {
        throw new AppError(401, "You are not authorized");
      }

      jwt.verify(token, config.JWT_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
          return next(new AppError(401, "Invalid or expired token"));
        }
        // const userRole = (decoded as JwtPayload).role as TUserRole;

        // if (roles.length && !roles.includes(userRole)) {
        //   return next(
        //     new AppError(
        //       httpStatus.FORBIDDEN,
        //       "You have no access to this route"
        //     )
        //   );
        // }

        // Attach user info to request
        req.user = decoded as JwtPayload;
        next();
      });
    } catch (error) {
      next(new AppError(5000, "Authentication failed"));
    }
  };
};

export default authenticate;
