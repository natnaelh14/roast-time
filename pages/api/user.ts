import { UserSession } from 'types';
import { sessionOptions } from 'utils/config';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

const userRouter = async (
  req: NextApiRequest,
  res: NextApiResponse<UserSession>,
) => {
  const { user } = req.session;
  if (user) {
    res.json({ ...user });
  } else {
    const userData = {
      isLoggedIn: false,
    };
    req.session.user = userData;
    await req.session.save();
    res.status(200).send(userData);
  }
};

export default withIronSessionApiRoute(userRouter, sessionOptions);
