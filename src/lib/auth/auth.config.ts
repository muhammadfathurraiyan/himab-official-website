import type { NextAuthConfig } from "next-auth";
import prisma from "../db";

export const authConfig = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnAuth) return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        if (user?.email) {
          const data = await prisma.user.findFirst({
            where: { email: user.email },
          });

          if (data) {
            token.id = data.id;
            token.job = data.job;
            token.role = data.role;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.job = token.job;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
