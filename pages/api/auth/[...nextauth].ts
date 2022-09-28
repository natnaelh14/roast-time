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
            async authorize (credentials, req) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                const user = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, 
                {username, password}).then((res) => res.data);
                if(!user?.accessToken) {
                    throw new Error()
                }
                return { ...user };
            }
            })
        ],
        pages: {
            signIn: '/signin',
            signOut: '/'
        },
        callbacks: {
            session: async({ session, token }) => {
                return { ...session, ...token };
            },
            jwt: async({ token, user }) => {             
                return { ...user, ...token };
            },    
        }, 
        // secret: "test",
        // jwt: {
        //     secret: "test",
        //     encryption: true,
        // }
};

export default NextAuth(authOptions);