import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from 'next-auth/providers/google'

import prisma from '../../../../prisma/client'

export const AuthOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        jwt: async ({ token }) => {

            const userInfo = await prisma.user.findUnique({
                where: {
                    email: token.email as string,
                }
            })

            if (userInfo) {
                userInfo.emailVerified = undefined!
            }

            token.user = userInfo
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user!
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
    adapter: PrismaAdapter(prisma)
}