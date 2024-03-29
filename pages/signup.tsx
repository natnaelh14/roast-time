import { GuestSignUpForm } from "components/Forms/GuestSignUpForm";
import { ThreeDotsLoading } from "components/Loaders";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { useState } from "react";
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

const SignUpForm = () => {
	const [loading, setLoading] = useState(false);
	if (loading) return <ThreeDotsLoading />;

	return (
		<div className="form-background flex min-h-[1000px] items-center justify-center">
			<div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-8 dark:border-gray-secondary dark:bg-blue-dark md:w-2/3 md:px-16 lg:w-3/5 xl:w-2/5">
				<div className="mb-6 text-center">
					<h1 className="text-xl text-pink-primary md:text-3xl">Get started with RoastTime today.</h1>
				</div>
				<GuestSignUpForm setLoading={setLoading} />
			</div>
		</div>
	);
};

export default SignUpForm;
