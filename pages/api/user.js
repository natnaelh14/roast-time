import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../utils/config';

const userRoute = async(req, res) => {
    if(req.session.user) {
        res.json({
            ...req.session.user,
        });
    } else {
        res.json({
            isLoggedIn: false
        })
    }
};

export default withIronSessionApiRoute(userRoute, sessionOptions)