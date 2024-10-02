import { NextFunction, Response, Request } from "express";
import { BaseResponse } from "../interfaces";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const response: BaseResponse = {
        success: false,
        message: "Something went wrong"
    }

    if(error.statusCode) {
        response.message = error.message;
    }

    res.status(error.statusCode || 500).json(response);
}