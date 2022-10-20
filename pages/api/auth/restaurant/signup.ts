import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from 'utils/config';

interface AuthPayload {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string,
    restaurant_name: string,
    restaurant_street_name: string,
    restaurant_city: string,
    restaurant_state: string,
    restaurant_zip_code: number
}

const signUpRestaurantRouter = async(req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, first_name, last_name, phone_number, restaurant_name,
        restaurant_street_name,
        restaurant_city,
        restaurant_state,
        restaurant_zip_code }: AuthPayload = req.body;
    try {
        const { data: userData } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/register`, 
        { email, password, first_name, last_name, phone_number, account_type: 'restaurant', restaurant_name,
        restaurant_street_name,
        restaurant_city,
        restaurant_state,
        restaurant_zip_code });
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

export default withIronSessionApiRoute(signUpRestaurantRouter, sessionOptions);