import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
import sendRespnse from '../../utils/sendResponse';
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
            
            return sendRespnse(res, {
                  statusCode: 201,
                  success: true,
                  message: "Login successfull!",
                  data: result
            })
      } catch (error) {
            next(error)
      }

}

const getCurrentUser = async(req: Request, res: Response) =>{

}

export const authController = {
      registerUser,
      loginUser,
      getCurrentUser
}