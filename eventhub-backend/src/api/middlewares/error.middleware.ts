import type { NextFunction, Request, Response } from "express";


export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const formattedError = {
        message: err.message || "An error occurred",
        code: err.statusCode || 500
    };

    if(typeof res.jsonError === 'function') {
        return res.jsonError(formattedError.message, formattedError.code);
    }

    res.status(formattedError.code).json({
        success: false,
        error: {
            message: formattedError.message,
            code: formattedError.code
        }
    });

}