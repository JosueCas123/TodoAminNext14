import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import async from '../../../dashboard/page';
import { singInEmail } from "@/auth/actions/auth-actions";

// Modificando la manera de inplementar NextAuth en app routes

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,

    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID ?? '',
          clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID ?? '',
          clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        
        CredentialsProvider({
          name: "Credentials",
      
          credentials: {
            email: { label: "Correo elctronico", type: "email", placeholder: "usuarioGoogle.com" },
            password: { label: "Caontrasena", type: "password", placeholder:'********' }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const user = await singInEmail(credentials!.email, credentials!.password)
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      session:{
        strategy: 'jwt',
      },
      callbacks:{
        async signIn({user, account, profile}) {

          return true
        },
        async jwt({token, user, account, profile, isNewUser}) {
          

          const dbUser = await prisma.user.findUnique({where: {email: token.email ?? 'no-email'}})

          token.roles = dbUser?.roles ?? ['no-role']
          token.id = dbUser?.id ?? 'no-id'
          return token
        },
        async session({session, token, user}) {
          if(session && session.user ){
            session.user.roles = token.roles
            session.user.id = token.id
          }
          return session
        },

      }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}