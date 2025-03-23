import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let errors: null | { path: string; message: string }[] = null;
    if (err.statusCode && err.message) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    } else if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation Error";
        errors = err.errors.map((error: any) => ({
            path: error.path,
            message: error.message,
        }))
    } else if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate Entry";
        const messageValue = err.errmsg.match(/dup key: \{ .*?: "(.*?)" \}/);
        const extractedValue = messageValue ? messageValue[1] : null;
        const path = err.errmsg.match(/dup key: \{ (\w+):/);
        const extractedPath = path ? path[1] : null;
        errors = [{
            path: extractedPath,
            message: `The provided ${extractedValue} already exists. Please use a different ${extractedPath}.`,
        }]
    } else if (err.name === 'ValidationError') {
        console.log(err)
        statusCode = 400;
        message = "Validation Error";
        errors = Object.values(err.errors).map((error: any) => ({
            path: error.path,
            message: error.message,
        }));
    }
    res.status(statusCode).json({
        success: false,
        message,
        errors,
        checkError: err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
