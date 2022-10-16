import { IronSessionOptions } from 'iron-session';
import { UserSession } from 'types';

export const sessionOptions: IronSessionOptions = {
    cookieName: "roastTime",
    password: process.env.COOKIE_TOKEN,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    },
    ttl: 60 * 60,
}

declare module "iron-session" {
    interface IronSessionData {
        user?: UserSession;
    }
}