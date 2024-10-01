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
      console.log({message})
      await db.session.delete({
        where: { sessionToken: message.token.jti },
      })
    }
  },
  callbacks: {
    async signIn({ account, profile, user}) {
      console.log({account,profile, user})
      let userFound;

      if (profile){
        userFound = await db.user.findUnique({
          where: { email: profile?.email as string },
        });
        
        
        if(!userFound && account?.provider === 'google'){
          return `/auth/register?email=${profile?.email}&first_name=${profile?.given_name}&last_name=${profile?.family_name}`
        }
      }else{
        userFound = await db.user.findUnique({
          where: { email: user?.email as string },
        });
        
      }
      
      if(userFound){
        const accountFound =  await db.account.findFirst({
          where: { user_id: userFound.user_id },
        });
          
          if(!accountFound && account){
            await db.account.create({
              data: {
                access_token: account.access_token,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                scope: account.scope,
                token_type: account.token_type,
                providerAccountId: account.providerAccountId,
                provider: account.provider,
                type: account.type,
                user_id: userFound.user_id  
              }
            });
          }        
        }
       return true
       

    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.user_id = user.user_id;
        token.name = user.first_name;
        token.lastName = user.last_name;
        token.email = user.email;
        token.role = user.role;
      }
      if(token) return token;
    },
    async session({ session, token }: any) {
      if(!token) return null
      const dbSessions = await db.session.findMany({
        where: {
          user_id: token.user_id,
        },
      });

      if(dbSessions && dbSessions.length > 0){
        for (const dbSession of dbSessions) {
          if (new Date() > dbSession.expires) {

            const sessionExists = await db.session.findUnique({
              where: { sessionToken: dbSession.sessionToken },
            });

            if(sessionExists){
              console.log(dbSession, 'expired')
              await db.session.delete({
                where: { sessionToken: dbSession.sessionToken },
              });
            }

          }
        }
      }
      
     
        const sessionFound = await db.session.findUnique({
          where: {sessionToken: token.jti}
        })

        if(!sessionFound){

          await db.session.create({
            data: {
              user_id: token.user_id,
              sessionToken: token.jti,
              expires: new Date(session.expires),
            },
          });
        }
      
        session.user.id = token.jti;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.role = token.role;
      
      return session;
    },

  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
});
