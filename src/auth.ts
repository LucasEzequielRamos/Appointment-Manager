import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/password";
import db from '@/lib/db';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      authorize: async (credentials) => {
        const user = await db.user.findUnique({ where: { email: credentials.email as string } });

        if (!user) return null;

        const matchPassword = await comparePassword(credentials.password as string, user.password);
        if (!matchPassword) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 100,
  },
  callbacks: {
    async jwt({ token, user } : any) {
      if (user) {
        // Añadir más campos al token
        token.id = user.id;
        token.name = user.first_name;
        token.lastName = user.last_name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token } : any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
