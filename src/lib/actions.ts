"use server";
import { CreateUserSchema, EditUserSchema } from "./types";
import prisma from "./db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn } from "./auth/auth";

export const createAccount = async (data: unknown) => {
  // server side validation
  const result = CreateUserSchema.safeParse(data);
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
    return { error: "Email telah digunakan." };
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

  revalidatePath("/admin/manajemen-admin");
};

export const deleteAccount = async (id: string) => {
  await prisma.user.delete({ where: { id: id } });
  revalidatePath("/admin/manajemen-admin");
};

export const editAccount = async (data: unknown, id: string) => {
  // server side validation
  const result = EditUserSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  // Retrieve the existing user by their ID
  const existingUser = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!existingUser) {
    return { error: "User not found." };
  }

  // Validate if user email already exists and it's different from the current email
  if (result.data.email !== existingUser.email) {
    const emailInUse = await prisma.user.findUnique({
      where: { email: result.data.email },
    });

    if (emailInUse) {
      return { error: "Email telah digunakan." };
    }
  }

  // hashing password
  if (result.data.resetPassword) {
    const hashedPassword = await bcrypt.hash(result.data.resetPassword, 10);
    await prisma.user.update({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
        role: result.data.role,
        event: result.data.event === "true" ? true : false,
      },
      where: {
        id: id,
      },
    });
  } else {
    await prisma.user.update({
      data: {
        name: result.data.name,
        email: result.data.email,
        role: result.data.role,
        event: result.data.event === "true" ? true : false,
      },
      where: {
        id: id,
      },
    });
  }

  revalidatePath("/admin/manajemen-admin");
};

export async function authenticate(data: FormData) {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau password salah.";
        default:
          return "Terdapat kesalahan silahkan refresh halaman dan coba lagi.";
      }
    }
    throw error;
  }
}
