import { beverageItems, breakfastItems, sideItems } from "data";
import MenuItem from "./MenuItem/MenuItem";

export const Menu = () => {
	return (
		<div className="my-4">
			<div className="my-2 border-t-2 border-gray-200 py-4 dark:border-gray-secondary">
				<h4 className="text-lg dark:text-white">Breakfast</h4>
				<div className="flex flex-row flex-wrap justify-between">
					{breakfastItems.map((item) => {
						return <MenuItem key={item.id} title={item.title} price={item.price} description={item.description} />;
					})}
				</div>
			</div>
			<div className="my-2 border-t-2 border-gray-200 py-4 dark:border-gray-secondary">
				<h4 className="text-lg dark:text-white">Sides</h4>
				<div className="flex flex-row flex-wrap justify-between">
					{sideItems.map((item) => {
						return <MenuItem key={item.id} title={item.title} price={item.price} />;
					})}
				</div>
			</div>
			<div className="my-2 border-t-2 border-gray-200 py-4 dark:border-gray-secondary">
				<h4 className="text-lg dark:text-white">Beverages</h4>
				<div className="flex flex-row flex-wrap justify-between">
					{beverageItems.map((item) => {
						return <MenuItem key={item.id} title={item.title} price={item.price} />;
					})}
				</div>
			</div>
		</div>
	);
};
