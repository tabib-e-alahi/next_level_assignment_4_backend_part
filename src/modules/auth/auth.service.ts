import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

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

const loginUser = async (payload: any) => {
      const user = await prisma.user.findUnique({
            where: {
                  email: payload.email
            }
      })

      if (!user) {
            throw new Error("User not found!");

      }

      const matchPassword = await bcrypt.compare(payload.password, user.password);
      if (!matchPassword) throw new Error("Invalid Password!");

      const userData = {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status
      }
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY as string, { expiresIn: "3d" })

      return { user, token }
}

const getCurrentUser = async (userId: string) => {
      const result = await prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true, status: true },
      });
      return result;
}

export const authService = {
      registerUser,
      loginUser,
      getCurrentUser
}