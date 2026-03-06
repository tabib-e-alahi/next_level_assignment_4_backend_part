import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const result = await authService.registerUser(req.body);
            return res.status(201).json({
                  success: true,
                  message: "User registration successfull!",
                  data: result
            })
      } catch (error: any) {
            next(error)
      }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const result = await authService.loginUser(req.body);
            return res.status(200).json({
                  success: true,
                  message: "Login successfull!",
                  data: result
            })
      } catch (error) {
            next(error)
      }

}

export const authController = {
      registerUser,
      loginUser
}