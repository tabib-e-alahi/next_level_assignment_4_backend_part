import { Request, Response } from 'express';
import sendError from '../../utils/sendError';
import { UserRole } from '../../middlewares/auth';
import { prisma } from '../../lib/prisma';
const getAllUsers = async (req: Request, res: Response) => {
      try {
            const user = req.user;
            if (user.role !== UserRole.ADMIN) {
                  return sendError(res, 403, "Forbidden Access!! Only for Admin.")
            }

            const users = await prisma.user.findMany({
                  include: {
                        providerProfiles: true, 
                  },
            });
            
      } catch (error) {
            return sendError(res, 500, "Could not fetched users data", error)
      }
}

export const adminController = {
      getAllUsers
}