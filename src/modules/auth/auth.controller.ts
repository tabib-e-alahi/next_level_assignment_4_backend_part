import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
import sendResponse from '../../utils/sendResponse';
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

            res.cookie("token", result.token, {
                  secure: false,
                  httpOnly: true,
                  sameSite: "strict"
            })

            return sendResponse(res, 200, "Login successfull!", result)
      } catch (error) {
            next(error)
      }

}

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const userId = req.user!.id;
            const result = await authService.getCurrentUser(userId);
            return sendResponse(res, 200, "User data retrieved.", result)
      } catch (error) {
            next(error)
      }
}

export const authController = {
      registerUser,
      loginUser,
      getCurrentUser
}