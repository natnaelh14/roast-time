import { useColorScheme } from "contexts/ColorSchemeContext";

interface HamburgerIconProps {
	handleClick: () => void;
}

export const HamburgerIcon = ({ handleClick }: HamburgerIconProps) => {
	const { colorScheme } = useColorScheme();

	return (
		<svg
			viewBox="0 0 100 80"
			width="40"
			height="40"
			fill={`${colorScheme === "dark" ? "#F78888" : "#858585"}`}
			className="m-4 block size-8 cursor-pointer md:hidden"
			onClick={handleClick}
		>
			<rect width="100" height="20"></rect>
			<rect y="30" width="100" height="20"></rect>
			<rect y="60" width="100" height="20"></rect>
		</svg>
	);
};
