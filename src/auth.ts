import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/password";
import db from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { url } from "inspector";

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


        if (!user) throw new Error('user not found');

        if(user.password){
          const matchPassword = await comparePassword(
            credentials.password as string,
            user.password
          );
          if (!matchPassword) throw new Error('password mismatch');
        }

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      allowDangerousEmailAccountLinking: true
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
    async signIn({ account, profile}) {
      // console.log({account, profile})

      if (account?.provider === "google") {
        const userFound = await db.user.findUnique({
          where: { email: profile?.email as string },
        });

        console.log(userFound)

        if(!userFound){
           return `/auth/register?email=${profile?.email}&first_name=${profile?.given_name}&last_name=${profile?.family_name}`
        }
        // {url: '/auth/register', profile}
       
}
      return true;
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
    signIn: '/auth/login',
    error: '/auth/error',
  },
});
