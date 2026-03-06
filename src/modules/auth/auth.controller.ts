import { Request, Response } from 'express';
import { authService } from './auth.service';
const registerUser = async(req: Request, res: Response) =>{
      try {
            const result = await authService.registerUser(req.body);

            return res.status(200).json({
                  success: true,
                  message: "User registration successfull!",
                  data: result
            })
      } catch (error) {
            return res.status(500).json({
                  success: false,
                  message: "user registration failed!",
                  error
            })
      }
}

export const authController = {
      registerUser
}