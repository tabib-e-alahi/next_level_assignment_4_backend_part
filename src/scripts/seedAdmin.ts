
import bcrypt from "bcryptjs";
import { UserRole } from "../middlewares/auth";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);

  const adminData = {
    name: process.env.ADMIN_NAME!,
    email: process.env.ADMIN_EMAIL!,
    role: UserRole.ADMIN,
    password: hashedPassword,
  };

  try {
    const isAdminAlreadyExists = await prisma.user.findUnique({
      where: {
        email: adminData.email as string,
      },
    });

    if (isAdminAlreadyExists) {
      console.log("Admin already exists!!");
      return;
    }
    const admin = await prisma.user.create({
      data: adminData,
    });

    console.log("Admin created successfully!!", admin);
  } catch (error) {
    console.log(error);
  } finally{
    await prisma.$disconnect()
  }
};
seedAdmin();