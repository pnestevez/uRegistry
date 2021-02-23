import { useState } from 'react';
// Components
import styles from '../styles/Register.module.css';
import formStyles from '../styles/Form.module.css';

export default function Address({ address, setAddress, setCoordinates }) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleCoordinates = (e) => {
    if (e.target.name === 'lat') setLat(e.target.value);
    if (e.target.name === 'lng') setLng(e.target.value);

    setCoordinates({
      lat,
      lng,
    });
  };

  const style = {
    borderRadius: '0 0 7.5px 7.5px',
  };

  return (
    <>
      <div className={styles.addressSection}>
        <input
          className={formStyles.input}
          placeholder="Type your address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={styles.nameSection}>
        <input
          style={style}
          className={formStyles.input}
          name="lat"
          placeholder="Latitude"
          type="number"
          value={lat}
          onChange={handleCoordinates}
        />
        <input
          style={style}
          className={formStyles.input}
          name="lng"
          placeholder="Longitude"
          type="number"
          value={lng}
          onChange={handleCoordinates}
        />
      </div>
    </>
  );
}
