import { UserSession } from 'types';
import { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  cookieName: 'roastTime',
  password: process.env.SECRET_COOKIE_PASSWORD ?? '',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  ttl: 60 * 60,
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserSession;
  }
}
