import { getAccount } from "components/api/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "types";
import { sessionOptions } from "utils/config";

const userRouter = async (req: NextApiRequest, res: NextApiResponse<UserSession>) => {
	const { user } = req.session;
	if (user?.account != undefined) {
		const response = await getAccount(user?.token ?? "", user?.account.id ?? "");
		if (response.isSuccess) {
			return res.status(200).json({ ...user, account: response.data.account });
		} else {
			console.error("Error getting account: ", response.error);
			const userData = {
				isLoggedIn: false,
			};
			req.session.user = userData;
			await req.session.save();
			return res.status(200).send(userData);
		}
	} else {
		const userData = {
			isLoggedIn: false,
		};
		req.session.user = userData;
		await req.session.save();
		return res.status(200).send(userData);
	}
};

export default withIronSessionApiRoute(userRouter, sessionOptions);
