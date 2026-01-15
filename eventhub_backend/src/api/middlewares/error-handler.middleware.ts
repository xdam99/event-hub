import type { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const formatedError = {
        message: err.message || "An error occurred",
        code: err.statusCode || 500,
    }

    res.jsonError(formatedError.message, formatedError.code);
};