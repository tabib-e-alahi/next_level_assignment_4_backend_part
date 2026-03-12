import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
const getAllUsers = async(req:Request, res: Response) =>{
      try {
            
      } catch (error) {
            return sendError
      }
}

export const adminController = {
      getAllUsers
}