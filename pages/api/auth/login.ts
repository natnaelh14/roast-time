import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/config';

interface AuthPayload {
    email: string,
    password: string
}

export default withIronSessionApiRoute(
    async(
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        const { email, password }: AuthPayload = req.body;
        try {
            const { data: userData } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, 
            {email, password});
            req.session.user = userData;
            await req.session.save();
            res.status(200).send(user);
        } catch (e) {

        }

    }, sessionOptions
);