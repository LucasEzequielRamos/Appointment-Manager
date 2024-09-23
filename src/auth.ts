import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { comparePassword } from "@/utils/password"
import db from '@/lib/db'
import { PrismaAdapter } from "@auth/prisma-adapter"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder:'Enter your email'},
        password: { label: 'Password', type: 'password', placeholder:'Enter your password'},
      },
      authorize: async (credentials) => {
        let user = null
        console.log(credentials)
        // logic to verify if the user exists
        user = await db.user.findUnique({where: {email: credentials.email as string}})
 
        if (!user)  return null 
        console.log(user)

        const matchPassword = await comparePassword(credentials.password as string, user.password)

        if (!matchPassword)  return null 

        // return user object with their profile data
        return user
      },
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 1000
  },
  callbacks:{
    session({session, user}){
      session.user.id = user.id
      return session
    }
  }
})