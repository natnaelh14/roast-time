import { StringLiteral } from "@babel/types";
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
            authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                if(username === "" || password === "") {
                    throw new Error('Invalid credentials.')
                }
                return { username, password }
            }
            })
        ],
        pages: {
            signIn: '/signin'
        }   
};

export default NextAuth(authOptions);


// export default NextAuth({
//     providers: [
//         CredentialProvider({
//             name: "credentials",
//             credentials:  {

//             },
//             authorize: (credentials) => {

//             }
//         })
//     ],
//     callbacks: {
//         jwt: async () => {},
//         session: () => {}
//     },
//     secret: "test",
//     jwt: {
//         secret: "test",
//         encryption: true,
//     }
// })