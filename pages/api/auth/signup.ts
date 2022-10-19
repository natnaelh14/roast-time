import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/config';

interface AuthPayload {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string
}

const signUpRouter = async(req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, first_name, last_name, phone_number }: AuthPayload = req.body;
    try {
        const { data: userData } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, 
        { email, password, first_name, last_name, phone_number, account_type: 'guest' });
        const user = {
            ...userData,
            isLoggedIn: true
        };
        req.session.user = user;
        await req.session.save();
        res.status(200).send(user);
    } catch (e) {
        console.error("unable to register user.")
    }
};

export default withIronSessionApiRoute(signUpRouter, sessionOptions);