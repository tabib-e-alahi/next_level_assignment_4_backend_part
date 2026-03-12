import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
const getAllUsers = async(req:Request, res: Response) =>{
      try {
             
      } catch (error) {
            return sendError(res, 500, "Could not fetched users data", error)
      }
}

export const adminController = {
      getAllUsers
}