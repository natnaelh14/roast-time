import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "types";
import { sessionOptions } from "utils/config";

export default withIronSessionApiRoute(mutateUserRoute, sessionOptions);

async function mutateUserRoute(req: NextApiRequest, res: NextApiResponse<UserSession>) {
	try {
		if (req.session.user) {
			const user = {
				...req.session.user,
				...req.body,
			} as UserSession;
			req.session.user = user;
			await req.session.save();
			res.status(200).send(user);
		} else {
			res.json({
				isLoggedIn: false,
			});
		}
	} catch (e) {
		console.error("error with mutate user", e);
	}
}
