import { Rating, RatingGraph } from "components/Rating";

export const Reviews = () => {
	return (
		<div className="my-5 flex flex-col lg:flex-row lg:justify-between">
			<div className="w-full">
				{/* eslint-disable-next-line tailwindcss/no-custom-classname */}
				<h4 className="font-gray-secondary font-bold dark:text-white">Overall ratings and reviews</h4>
				<p className="text-gray-500">Reviews can only be made by diners who have eaten at this restaurant</p>
				<div className="flex flex-row">
					<Rating />
					<p className="ml-2 text-gray-500">4.4 based on recent ratings</p>
				</div>
			</div>
			<RatingGraph />
		</div>
	);
};
