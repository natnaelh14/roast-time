import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import {sessionOptions } from 'utils/config';
import { parseJwt } from 'utils/helpers';

export default withIronSessionApiRoute(async(req, res) => {
    try {
        const { data: { accessToken} } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, req.body);
        const payload = parseJwt(accessToken);
        const user = {
            isLoggedIn: true,
            token: accessToken,
            username: payload?.username
        }
        await req.session.save(user);
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message })
    }
}, sessionOptions);