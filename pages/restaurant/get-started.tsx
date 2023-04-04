import { RestaurantSignUpForm } from "components/Forms";
import { ThreeDotsLoading } from "components/Loaders";
import { useState } from "react";

const GetStarted = () => {
	const [loading, setLoading] = useState(false);
	if (loading) return <ThreeDotsLoading />;

	return (
		<div className="form-background flex min-h-[800px] w-full flex-row items-center justify-center py-16">
			<div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-8 py-8 dark:border-gray-secondary dark:bg-blue-dark md:w-2/3 md:px-16 lg:w-3/5 xl:w-2/5">
				<div className="mb-6 text-center">
					<h1 className="text-center text-xl text-pink-primary md:text-3xl">Get started with RoastTime today.</h1>
					<p className="mt-1 text-center text-xs text-gray-secondary dark:text-white md:text-base">
						Fill out the form below and a member of our team will contact you shortly
					</p>
				</div>
				<RestaurantSignUpForm setLoading={setLoading} />
			</div>
		</div>
	);
};

export default GetStarted;
