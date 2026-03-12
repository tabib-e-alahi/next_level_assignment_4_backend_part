import { prisma } from "../../lib/prisma";

const getProfile = async(userId: string | undefined) =>{
      if(!userId){
            throw new Error("Invalid userid");
      }

      const result  =await prisma.user.findUniqueOrThrow({
            where:{
                  id: userId
            }
      })

      return result;
}

export const customerService = {
      getProfile
}