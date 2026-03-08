import { Request, Response, NextFunction } from "express";
import sendError from "../utils/sendError";
import { UserRole } from "./auth";

export const providerGuard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user;

    if (!user) {
        return sendError(res, 401, "Unauthorized access.");
    }

    if (user.role !== UserRole.PROVIDER) {
        return sendError(res, 403, "Only providers can access this resource.");
    }

    if (user.status !== "ACTIVE") {
        return sendError(res, 403, "Your account is not active.");
    }

    next();
};