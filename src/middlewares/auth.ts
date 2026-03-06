import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
                  const token = req.headers.authorization?.split(" ")[1];
                  if (!token) throw new Error("Unauthorized Access!");

                  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
                  if (!decode) throw new Error("Forbidden!");
                  req.user = decode as JwtPayload;
                  console.log(decode);

            } catch (error) {
                  next(error)
            }
      }

}

export default auth;