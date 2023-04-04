import { sessionOptions } from "utils/config";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { restaurantSignup } from "components/api/api";

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

const signUpRestaurantRouter = async (req: NextApiRequest, res: NextApiResponse) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const payload: AuthPayload = req.body;
	const response = await restaurantSignup(payload);
	if (!response.isSuccess) {
		console.error("unable to register user.");
		return res.status(500).send(response.error);
	}
	const user = {
		...response.data,
		isLoggedIn: true,
	};
	req.session.user = user;
	await req.session.save();
	res.status(200).send(user);
};

export default withIronSessionApiRoute(signUpRestaurantRouter, sessionOptions);
