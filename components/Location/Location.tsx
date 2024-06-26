import LocationSVG from "./LocationSVG";

const Location = () => {
	return (
		<div className="mt-6 flex flex-row hover:cursor-pointer">
			<LocationSVG />
			<p className="decoration-pink-primary decoration-2 underline-offset-8 hover:underline dark:text-white lg:text-lg">
				Coffee shops near you
			</p>
		</div>
	);
};

export default Location;
