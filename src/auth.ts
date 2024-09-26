import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/password";
import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        if(user.password){
          const matchPassword = await comparePassword(
            credentials.password as string,
            user.password
          );
          if (!matchPassword) return null;
        }

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  events: {
    async signOut(message : any) {
      await db.session.delete({
        where: { sessionToken: message.token.id },
      })
    }
  },
  callbacks: {
    async signIn({ account, profile, query, url }:any) {
      console.log({account, profile,query,url})

      const action = query?.action || new URL(url).searchParams.get("action");
      if (account.provider === "google") {
        const user = await db.user.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          if (action === "login") {
            return "/register"; // Redirigir al registro si no está registrado
          } // Si el usuario no existe y está registrándose, lo dejamos continuar
          if (action === "register") {
            await db.user.create({
              data:{
                email: profile.email,
                first_name: profile.given_name,
                last_name: profile.family_name,   

              }
            })
            return '/login';
          }
        } else {
          if (action === "register") {
            return "/login"; // Redirigir al login si ya está registrado
          }
          return true; 
        }
      }
      return true; // Continuar el flujo para otros proveedores
    },
    async jwt({ token, user }: any) {
      console.log(user, token)
      if (user) {
        token.id = user.id;
        token.user_id = user.user_id;
        token.name = user.first_name;
        token.lastName = user.last_name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }: any) {
      if(!token) return null
      const dbSessions = await db.session.findMany({
        where: {
          user_id: token.user_id,
        },
      });

      for (const dbSession of dbSessions) {
        if (new Date() > dbSession.expires) {
          console.log(dbSession, 'expired')
          await db.session.delete({
            where: { sessionToken: dbSession.sessionToken },
          });
        }
      }

      await db.session.create({
        data: {
          user_id: token.user_id,
          sessionToken: token.id,
          expires: new Date(session.expires),
        },
      });
      
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
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
});
