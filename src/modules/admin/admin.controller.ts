import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
const getAllUsers = async(req:Request, res: Response) =>{
      try {
            const user = req.user;
            console.log(user.role);  
      } catch (error) {
            return sendError(res, 500, "Could not fetched users data", error)
      }
}

export const adminController = {
      getAllUsers
}