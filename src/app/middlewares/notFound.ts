import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: false,
        message: "API Not Found",
        requestedUrl: req.originalUrl, 
        error: "The endpoint you are looking for does not exist."
    });
    next();
};

export default notFound;
