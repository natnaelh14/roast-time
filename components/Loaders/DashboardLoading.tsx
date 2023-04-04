import { ItemLoading } from "./ItemLoading";

export const DashboardLoading = () => {
	return (
		<div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
			{Array(10)
				.fill(0)
				.map((e, i) => {
					return <ItemLoading key={i} />;
				})}
		</div>
	);
};
