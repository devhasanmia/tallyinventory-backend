import { ErrorRequestHandler } from "express";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.statusCode && err.message) {
        statusCode = err.statusCode;
        message = err.message;
    }
    console.log(err.name)
    res.status(statusCode).json({
        success: false,
        message,
        err: err.message || err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
