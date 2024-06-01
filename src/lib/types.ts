import { z } from "zod";

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nama harus lebih dari 1 karakter." })
      .max(50, { message: "Nama harus kurang dari 50 karakter." }),
    email: z
      .string()
      .email("Email tidak valid.")
      .min(1, { message: "Email harus lebih dari 1 karakter." })
      .max(50, { message: "Email harus kurang dari 50 karakter." }),
    password: z
      .string()
      .min(8, { message: "Password harus lebih dari 8 karakter." }),
    role: z.string().min(1, { message: "Role harus dipilih." }),
    job: z.array(z.string()).min(1, { message: "Job harus dipilih." }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password yang anda isi berbeda",
    path: ["confirmPassword"],
  });

export const EditUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama harus lebih dari 1 karakter." })
    .max(50, { message: "Nama harus kurang dari 50 karakter." }),
  email: z
    .string()
    .email("Email tidak valid.")
    .min(1, { message: "Email harus lebih dari 1 karakter." })
    .max(50, { message: "Email harus kurang dari 50 karakter." }),
  role: z.string().min(1, { message: "Role harus dipilih." }),
  event: z.string().optional(),
  job: z.string().array().min(1, { message: "Job harus dipilih." }),
  resetPassword: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid.")
    .min(1, { message: "Email harus lebih dari 1 karakter." })
    .max(50, { message: "Email harus kurang dari 50 karakter." }),
  password: z
    .string()
    .min(8, { message: "Password harus lebih dari 8 karakter." }),
});

export const BlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Judul harus lebih dari 1 karakter." })
    .max(50, { message: "Judul harus kurang dari 50 karakter." }),
  image: z.string().min(12, { message: "Link gambar tidak valid." }),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  userId: z.string().min(1, { message: "Ada kesalahan!." }),
});

export const KategoriSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Judul harus lebih dari 1 karakter." })
    .max(50, { message: "Judul harus kurang dari 50 karakter." }),
  userId: z.string().min(1, { message: "Ada kesalahan!." }),
});
