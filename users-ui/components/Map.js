// Components
import { GoogleMap } from '@react-google-maps/api';
import mapStyles from '../lib/mapStyles';

const containerStyle = {
  height: '100%',
  width: '75%',
  minWidth: '215px',
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({ center, zoom, children }) {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={options}
    >
      {children}
    </GoogleMap>
  );
}
