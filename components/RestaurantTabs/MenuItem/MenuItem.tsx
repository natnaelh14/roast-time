interface MenuItemProps {
	title: string;
	price: number;
	description?: string;
}
const MenuItem = ({ title, price, description }: MenuItemProps) => {
	return (
		<div className="m-2 w-[300px]">
			{title && price && (
				<div className="flex flex-wrap justify-between text-base">
					<p className="text-gray-secondary dark:text-gray-300">{title}</p>
					<p className="text-gray-secondary dark:text-gray-300">${price}</p>
				</div>
			)}
			{description && <p className="text-base text-gray-500">{description}</p>}
		</div>
	);
};

export default MenuItem;
