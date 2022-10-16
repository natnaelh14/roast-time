import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSession } from 'types';
import { sessionOptions } from 'utils/config';

const userRouter = async(req: NextApiRequest, res: NextApiResponse< UserSession>) => {
    const user = req.session.user;
    if (user) {
        res.json({ ...user })
    } else {
        res.json({ isLoggedIn: false })
    }
};

export default withIronSessionApiRoute(userRouter, sessionOptions);

