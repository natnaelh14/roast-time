import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`,
                    { email, password })
                    .then((res) => { return res.data }).catch((e) => {
                        return null
                    }) || null
            }
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/signin'
    },
    callbacks: {
        session: async ({ session, token }) => {
            return { ...session, ...token };
        },
        jwt: async ({ token, user }) => {
            return { ...user, ...token };
        },
    },
};

export default NextAuth(authOptions);