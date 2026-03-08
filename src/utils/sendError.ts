import { Response } from "express";

const sendError = (res: Response, statusCode: number, message: string, error?: any) => {
      return res.status(statusCode).json({
            success: false,
            message,
            error
      });
};

export default sendError;