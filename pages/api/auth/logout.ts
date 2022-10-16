import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserSession } from 'types';
import { sessionOptions } from 'utils/config';

const logoutRouter = async(req: NextApiRequest, res: NextApiResponse< UserSession>) => {
    try {
        req.session.destroy();
        res.json({ isLoggedIn: false })
    } catch (e) {
        res.status(500).json({ isLoggedIn: false })
    }
};

export default withIronSessionApiRoute(logoutRouter, sessionOptions);