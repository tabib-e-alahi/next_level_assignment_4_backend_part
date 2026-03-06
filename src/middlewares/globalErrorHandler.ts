import { NextFunction, Request, Response } from "express";
import { Prisma } from "../generated/prisma/client";

function errorHandler(
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
) {
      let statusCode = 500;
      let errorMessage = "Internal Server Error";
      let errorDetails = err.message || err;

      // PrismaClientValidationError
      if (err instanceof Prisma.PrismaClientValidationError) {
            statusCode = 400;
            errorMessage = "It looks like some of the information you entered is incorrect. Please check your inputs and try again.";
      }
      // PrismaClientKnownRequestError
      else if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
                  statusCode = 400;
                  errorMessage = "The item you are trying to update or access does not exist. Please check and try again.";
            }
            else if (err.code === "P2002") {
                  statusCode = 400;
                  errorMessage = "Duplicate key error. This entry already exists. Please try a different value.";
            }
            else if (err.code === "P2003") {
                  statusCode = 400;
                  errorMessage = "Foreign key constraint failed.";
            }
      }
      // PrismaClientUnknownRequestError
      else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            statusCode = 500;
            errorMessage = "Unexpected issue. Please try again later.";
      }
      // PrismaClientInitializationError
      else if (err instanceof Prisma.PrismaClientInitializationError) {
            if (err.errorCode === "P1000") {
                  statusCode = 401;
                  errorMessage = "Authentication failed. Please check your credentials.";
            }
            else if (err.errorCode === "P1001") {
                  statusCode = 400;
                  errorMessage = "Cannot reach the database server. Try again later.";
            }
      }

      res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: errorDetails,
      });
}

export default errorHandler;