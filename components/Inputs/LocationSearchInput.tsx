import { Dispatch, SetStateAction } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import styles from "styles/LocationSearch.module.css";
import { classNames } from "utils/helpers";

interface LocationSearchInputProps {
	name: string;
	label: string;
	address: string;
	setAddress: Dispatch<SetStateAction<string | undefined>>;
	setLat: Dispatch<SetStateAction<number | undefined>>;
	setLong: Dispatch<SetStateAction<number | undefined>>;
}

export const LocationSearchInput = ({ ...props }: LocationSearchInputProps) => {
	const { label, name, address, setAddress, setLat, setLong } = props;
	const handleChange = (updatedAddress: string) => {
		setAddress(updatedAddress);
	};

	const handleSelect = (updatedAddress: string) => {
		setAddress(updatedAddress);
		geocodeByAddress(updatedAddress)
			.then((results) => {
				return results[0] && getLatLng(results[0]);
			})
			.then((latLng) => {
				if (latLng === undefined) return;
				setLat(latLng.lat);
				setLong(latLng.lng);
			})
			.catch((e) => console.error("Error", e));
	};

	return (
		<PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div className="relative mb-5 space-y-1 pt-5">
					<input
						id={name}
						{...getInputProps({
							type: "text",
							autoComplete: "on",
							placeholder: "Search Coffee Shop ...",
							className: `${styles.locationSearchInput}`,
						})}
						className={classNames(
							"shadow-border-b hover:shadow-border-b-2 focus:shadow-border-b-2 peer mt-2 inline-block w-full rounded-lg border  border-slate-300 bg-transparent p-2 text-base text-gray-500 shadow-gray-300 transition placeholder:text-transparent hover:shadow-pink-primary focus:shadow-pink-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:text-gray-300 dark:border-gray-secondary dark:bg-gray-700  dark:text-gray-300",
						)}
						placeholder="Search Coffee Shop ..."
					/>
					<label
						className={classNames(
							"absolute -top-0.5 left-0.5 select-none text-xs font-medium text-neutral-500 transition-all  ease-out peer-placeholder-shown:pointer-events-none peer-placeholder-shown:text-xs peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-sm dark:text-neutral-300 md:text-sm md:peer-placeholder-shown:text-base",
						)}
						htmlFor={name}
					>
						{label}
					</label>
					<div className={styles.autocompleteContainer}>
						{loading && <div>Loading...</div>}
						{suggestions.map((suggestion, i) => {
							const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
							const style = suggestion.active
								? { backgroundColor: "#e4e4e7", cursor: "pointer" }
								: { backgroundColor: "#fafafa", cursor: "pointer" };
							return (
								<div
									// @ts-ignore:next-line
									key={i}
									{...getSuggestionItemProps(suggestion, {
										className,
										style,
									})}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
};
