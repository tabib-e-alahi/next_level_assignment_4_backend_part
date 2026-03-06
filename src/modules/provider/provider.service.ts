import { ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProfile = async (data: ProviderProfile, userId: string) => {
      const existingProfile = await prisma.providerProfile.findUnique({
            where: { userId },
      });

      if (existingProfile) {
            throw new Error("Provider profile already exists");
      }

      const result = await prisma.providerProfile.create({
            data: {
                  ...data,
                  userId
            }
      })

      return result;

}

export const providerService = {
      createProfile
}