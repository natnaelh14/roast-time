import { sessionOptions } from "utils/config";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { login } from "components/api/api";

interface AuthPayload {
	email: string;
	password: string;
}

export default withIronSessionApiRoute(async (req: NextApiRequest, res: NextApiResponse) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { email, password }: AuthPayload = req.body;
	const response = await login({ email, password });
	if (!response.isSuccess) {
		console.error(response.error);
		return res.status(500).json({ isLoggedIn: false });
	}
	const user = {
		...response.data,
		isLoggedIn: true,
	};
	req.session.user = user;
	await req.session.save();
	res.status(200).send(user);
}, sessionOptions);
