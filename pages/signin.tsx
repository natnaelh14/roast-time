import { SignInForm } from "components/Forms";
import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "utils/config";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	if (user?.isLoggedIn) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}, sessionOptions);

const SignIn = () => {
	return (
		<div className="form-background flex min-h-[800px] items-center justify-center">
			<div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-8 py-8 dark:border-gray-secondary dark:bg-blue-dark md:w-2/3 md:px-16 lg:w-2/5 xl:w-1/3">
				<div className="mb-6 text-center">
					<h1 className="text-center text-xl text-pink-primary md:text-3xl">Go ahead, login.</h1>
					<p className="text center mt-1 text-xs text-gray-secondary dark:text-white md:text-base">
						Welcome back to RoastTime
					</p>
				</div>
				<SignInForm />
			</div>
		</div>
	);
};

export default SignIn;
