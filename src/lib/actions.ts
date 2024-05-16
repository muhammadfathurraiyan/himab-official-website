"use server";
import { CreateUserSchema } from "./types";
import prisma from "./db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createAccount = async (newAccount: unknown) => {
  // server side validation
  const result = CreateUserSchema.safeParse(newAccount);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  // validate if user email already exist
  const existingUser = await prisma.user.findUnique({
    where: { email: result.data.email },
  });
  if (existingUser) {
    return { error: "user with this email already exists." };
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      password: hashedPassword,
      role: result.data.role,
    },
  });

  redirect("/admin/manajemen-admin");
};
