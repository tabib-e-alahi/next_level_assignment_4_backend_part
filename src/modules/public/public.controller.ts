import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { publicService } from './public.service';
import sendResponse from '../../utils/sendResponse';


const getAllCatgeories = async(req: Request, res: Response) =>{
      try {
            const limit = req.query.limit as string | undefined;

            const result = await publicService.getAllCatgeories(limit);

            return sendResponse(res, 200, "Done", result)
      } catch (error) {
            sendError(res, 500, "Could not fetched categories", error)
      }
}

export const publicController = {
      getAllCatgeories
}