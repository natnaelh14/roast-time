import { classNames } from 'utils/helpers';
import styles from 'styles/LocationSearch.module.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

interface LocationSearchInputProps {
  name: string;
  label: string;
  address: string;
  setAddress: (address: string) => void;
  setLat: (lat: number) => void;
  setLong: (long: number) => void;
}

export const LocationSearchInput = ({ ...props }: LocationSearchInputProps) => {
  const { label, name, address, setAddress, setLat, setLong } = props;
  const handleChange = (updatedAddress: string) => {
    setAddress(updatedAddress);
  };

  const handleSelect = (updatedAddress: string) => {
    setAddress(updatedAddress);
    geocodeByAddress(updatedAddress)
      .then((results) => getLatLng(results[0]))
      // eslint-disable-next-line promise/always-return
      .then((latLng) => {
        setLat(latLng.lat);
        setLong(latLng.lng);
      })
      .catch((error) => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative space-y-1 pt-5">
          <input
            id={name}
            required={true}
            {...getInputProps({
              type: 'text',
              autoComplete: 'on',
              placeholder: 'Search Coffee Shop ...',
              className: `${styles.locationSearchInput}`,
            })}
            className={classNames(
              'shadow-border-b hover:shadow-border-b-2 focus:shadow-border-b-2 peer mt-2 inline-block w-full rounded-lg border  border-slate-300 bg-transparent p-2 text-base text-gray-500 shadow-gray-300 transition placeholder:text-transparent hover:shadow-pink-primary focus:shadow-pink-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:text-gray-300 dark:border-gray-secondary dark:bg-gray-700  dark:text-gray-300',
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
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#e4e4e7', cursor: 'pointer' }
                : { backgroundColor: '#fafafa', cursor: 'pointer' };
              return (
                <div
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
