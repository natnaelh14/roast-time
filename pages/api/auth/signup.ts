import { sessionOptions } from 'utils/config';
import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

interface AuthPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const signUpRouter = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstName, lastName, phoneNumber }: AuthPayload =
    req.body;
  try {
    const { data: userData } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
      {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        accountType: 'GUEST',
      },
    );
    const user = {
      ...userData,
      isLoggedIn: true,
    };
    req.session.user = user;
    await req.session.save();
    res.status(200).send(user);
  } catch (e) {
    console.error('unable to register user.');
  }
};

export default withIronSessionApiRoute(signUpRouter, sessionOptions);
