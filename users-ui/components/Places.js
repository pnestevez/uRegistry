import { useState } from 'react';
// Components
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styles from '../styles/Register.module.css';
import formStyles from '../styles/Form.module.css';
// Funtions
import { validateAddress } from '../utils';

export default function Address({ address, setAddress, setCoordinates }) {
  const [isValidAddress, setIsValidAddress] = useState(false);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    validateAddress(latLng) && setIsValidAddress(true);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({
        getInputProps,
        suggestions,
        getSuggestionItemProps,
      }) => (
        <div className={styles.addressSection}>
          <input
            style={!isValidAddress ? { borderColor: 'red' } : null}
            {...getInputProps(
              {
                placeholder: 'Type your address',
                className: formStyles.input,
              },
            )}
          />
          <div
            style={!isValidAddress ? { backgroundColor: 'red' } : null}
            className={formStyles.optionsContainer}
          >
            {suggestions.map((suggestion) => {
              const backgroundColor = isValidAddress ? '#eaeaea' : 'red';
              const color = isValidAddress ? '#black' : 'white';
              const style = {
                backgroundColor: suggestion.active ? 'black' : backgroundColor,
                color: suggestion.active ? 'white' : color,
              };

              return (
                <div
                  key={suggestion.placeId}
                  {... getSuggestionItemProps(suggestion,
                    {
                      className: formStyles.option,
                      style,
                    })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
