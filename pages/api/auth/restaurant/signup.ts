import { sessionOptions } from 'utils/config';
import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

interface AuthPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  imageData: string[];
}

const signUpRestaurantRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { ...payload }: AuthPayload = req.body;
  try {
    const { data: userData } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/register`,
      { ...payload, accountType: 'RESTAURANT' },
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
    return res.status(500).send(e);
  }
};

export default withIronSessionApiRoute(signUpRestaurantRouter, sessionOptions);
