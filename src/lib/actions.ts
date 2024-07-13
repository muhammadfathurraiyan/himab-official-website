"use server";
import {
  CreateUserSchema,
  EditUserSchema,
  BlogSchema,
  KategoriSchema,
  BeritaSchema,
  DatabaseSchema,
  StrukturOrganisasiSchema,
  AsramaMahasiswaSchema,
} from "./types";
import prisma from "./db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth/auth";
import { redirect } from "next/navigation";

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
      job: result.data.job,
    },
  });

  revalidatePath("/dashboard/manajemen-admin");
};

export const deleteAccount = async (id: string) => {
  await prisma.user.delete({ where: { id: id } });
  revalidatePath("/dashboard/manajemen-admin");
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
        job: result.data.job,
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
        job: result.data.job,
      },
      where: {
        id: id,
      },
    });
  }

  revalidatePath("/dashboard/manajemen-admin");
};

export async function loginAction(data: FormData) {
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

export async function logoutAction() {
  await signOut();
}

export async function editSejarah(data: unknown, id: string) {
  const result = BlogSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.sejarah.update({
    data: {
      title: result.data.title,
      image: result.data.image,
      excerpt: result.data.excerpt,
      content: result.data.content,
      userId: result.data.userId,
    },
    where: { id: id },
  });

  revalidatePath("/dashboard/profile");
}

export async function editVisiMisi(data: unknown, id: string) {
  const result = BlogSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.visiMisi.update({
    data: {
      title: result.data.title,
      image: result.data.image,
      excerpt: result.data.excerpt,
      content: result.data.content,
      userId: result.data.userId,
    },
    where: { id: id },
  });

  revalidatePath("/dashboard/profile");
}

export async function editTentangHimab(data: unknown, id: string) {
  const result = BlogSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.tentang.update({
    data: {
      title: result.data.title,
      image: result.data.image,
      excerpt: result.data.excerpt,
      content: result.data.content,
      userId: result.data.userId,
    },
    where: { id: id },
  });

  revalidatePath("/dashboard/profile");
}

export async function editKontak(data: unknown, id: string) {
  const result = BlogSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.kontak.update({
    data: {
      title: result.data.title,
      image: result.data.image,
      excerpt: result.data.excerpt,
      content: result.data.content,
      userId: result.data.userId,
    },
    where: { id: id },
  });

  revalidatePath("/dashboard/kontak");
}

export async function createKategori(data: unknown) {
  const result = KategoriSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.kategori.create({
    data: {
      title: result.data.title,
    },
  });

  revalidatePath("/dashboard/berita");
}

export async function editKategori(data: unknown, id: string) {
  const result = KategoriSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.kategori.update({
    data: {
      title: result.data.title,
    },
    where: { id: id },
  });

  revalidatePath("/dashboard/berita");
}

export const deleteKategori = async (id: string) => {
  await prisma.kategori.delete({ where: { id: id } });
  revalidatePath("/dashboard/berita");
};

export async function createBerita(data: unknown) {
  const result = BeritaSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.berita.create({
    data: {
      title: result.data.title,
      category: result.data.category,
      slug: result.data.slug,
      image: result.data.image,
      content: result.data.content,
      excerpt: result.data.excerpt,
      userId: result.data.userId,
    },
  });

  revalidatePath("/dashboard/berita");
}

export async function editBerita(data: unknown, id: string) {
  const result = BeritaSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.berita.update({
    data: {
      title: result.data.title,
      category: result.data.category,
      slug: result.data.slug,
      image: result.data.image,
      content: result.data.content,
      excerpt: result.data.excerpt,
      userId: result.data.userId,
    },
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/berita");
}

export const deleteBerita = async (id: string) => {
  await prisma.berita.delete({ where: { id: id } });
  revalidatePath("/dashboard/berita");
};

export async function createDatabase(data: unknown) {
  const result = DatabaseSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.database.create({
    data: {
      name: result.data.name,
      jabatan: result.data.jabatan,
      image: result.data.image,
      tahunMulai: result.data.tahunMulai,
      tahunSelesai: result.data.tahunSelesai,
    },
  });

  revalidatePath("/dashboard/database");
}

export async function editDatabase(data: unknown, id: string) {
  const result = DatabaseSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.database.update({
    data: {
      name: result.data.name,
      jabatan: result.data.jabatan,
      image: result.data.image,
      tahunMulai: result.data.tahunMulai,
      tahunSelesai: result.data.tahunSelesai,
    },
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/database");
}

export const deleteDatabase = async (id: string) => {
  await prisma.database.delete({ where: { id: id } });
  revalidatePath("/dashboard/database");
};

export async function createStrukturOrganisasi(data: unknown) {
  const result = StrukturOrganisasiSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.strukturOrganisasi.create({
    data: {
      name: result.data.name,
      jabatan: result.data.jabatan,
      image: result.data.image,
    },
  });

  revalidatePath("/dashboard/profil");
}

export async function editStriktukrOrganisasi(data: unknown, id: string) {
  const result = StrukturOrganisasiSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.strukturOrganisasi.update({
    data: {
      name: result.data.name,
      jabatan: result.data.jabatan,
      image: result.data.image,
    },
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/profil");
}

export const deleteStrukturOrganisasi = async (id: string) => {
  await prisma.strukturOrganisasi.delete({ where: { id: id } });
  revalidatePath("/dashboard/profil");
};

export async function editAsramaMahasiswa(data: unknown, id: string) {
  const result = AsramaMahasiswaSchema.safeParse(data);
  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  await prisma.asrama.update({
    data: {
      title: result.data.title,
      image: result.data.image,
      description: result.data.description,
      data: result.data.data,
    },
    where: {
      id: id,
    },
  });

  revalidatePath("/dashboard/profil");
}
