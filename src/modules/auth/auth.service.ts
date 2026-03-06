import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const registerUser = async (payload: User) => {
      const hashedPass = await bcrypt.hash(payload.password, 10);
      const result = await prisma.user.create({
            data: {
                  ...payload,
                  password: hashedPass
            }
      })

      return result;
}

export const authService = {
      registerUser
}