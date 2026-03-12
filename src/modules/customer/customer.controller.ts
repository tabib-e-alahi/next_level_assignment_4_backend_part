import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { customerService } from './customer.service';
const getProfile = async(req: Request, res: Response) =>{
      try {
            const userId = req.user.id; 
            const result  = await customerService.getProfile()
      } catch (error) {
            return sendError(res, 500, "Could not get profile data", error)
      }
}

export const customerController = {
      getProfile
}