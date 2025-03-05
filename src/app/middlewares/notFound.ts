// 404 Not Found Middleware
import { NextFunction, Request, Response } from "express";

const notFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Api Resource Not Found",
        error: ""
    });
    next();
}


export default notFound;