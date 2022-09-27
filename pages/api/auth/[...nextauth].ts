import { StringLiteral } from "@babel/types";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { parseJwt } from 'utils/helpers';
import { signIn } from "next-auth/react";

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
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {username, password});
                // const payload = parseJwt(res.data?.accessToken);
                console.log("WORLD", res.data?.accessToken)
                if(!res.data?.accessToken) {
                    throw new Error('Invalid credentials.')
                }
                const user = { token: res.data?.accessToken }
                return user;
            }
            })
        ],
        pages: {
            signIn: '/signin'
        },
        callbacks: {
            // async signIn({ user , account }) {
            //     console.log("jwt", { token })
            //     return user;
            // },
            session: async(session, user) => {
                console.log("sessionData", session);
                console.log("userDataOne", user);
                return session;
            },
            jwt: async(token, user) => {
                console.log("tokenData", token);
                console.log("userDataTwo", user);                
                return token;
            },
            
        }, 
        secret: "test",
        jwt: {
            secret: "test",
            encryption: true,
        }
};

export default NextAuth(authOptions);