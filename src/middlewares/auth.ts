import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import sendError from '../utils/sendError';
import { prisma } from '../lib/prisma';

export enum UserRole {
      CUSTOMER = "CUSTOMER",
      PROVIDER = "PROVIDER",
      ADMIN = "ADMIN"
}
declare global {
      namespace Express {
            interface Request {
                  user: JwtPayload;
            }
      }
}

const auth = (...roles: UserRole[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
            try {
                  console.log("Hittttttttttttttttttttttttttttttttttttttt");
                  const token = req.headers.authorization?.split(" ")[1];
                  if (!token) {
                        return sendError(res, 401, "Unauthorized Access! Invalid token provided");
                  }
                  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
                  if (!decode) throw new Error("Forbidden!");

                  const userData = await prisma.user.findUnique({
                        where: {
                              email: decode.email
                        }
                  })

                  if (!userData) {
                        return sendError(res, 401, "Unauthorized Access! User does not exist!");
                  }
                  if (userData.status === "SUSPENDED") {
                        return sendError(res, 403, "Forbidden Access! This account is suspended!");
                  }
                  req.user = decode;

                  if (roles.length && !roles.includes(req.user.role))
                        return sendError(res, 403, "Forbidden! Only for Authorized User")

                  next();
            } catch (error: any) {
                  return sendError(res, 401, "Invalid or Expired Token");
            }
      }

}

export default auth;