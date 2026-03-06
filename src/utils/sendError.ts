import { Response } from "express";

const sendError = (res: Response, statusCode: number, message: string) => {
      return res.status(statusCode).json({
            success: false,
            message,
      });
};

export default sendError;