import { ThreeDots } from "react-loader-spinner";

export const ThreeDotsLoading = () => {
	return (
		<div className="flex h-[800px] items-center justify-center">
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="#F78888"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				visible={true}
			/>
		</div>
	);
};
