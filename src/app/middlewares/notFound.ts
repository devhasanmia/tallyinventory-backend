<<<<<<< HEAD
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
=======
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
>>>>>>> e8eb868a8adb17b42da9029de9af226693dbef1a
