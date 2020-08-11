import React from 'react';
import mapStyles from '../mapStyle';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

function MinMap(props) {
  const provider = props.providerL && props.providerL.location;
  var loc = JSON.parse(provider);
  const [map, setMap] = React.useState(null);
  //const [selectedProvider, setSelectedProvider] = React.useState(null);
  const center = {
    lat: Number(loc && loc.lat),
    lng: Number(loc && loc.lng),
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const position = {
    lat: Number(loc && loc.lat),
    lng: Number(loc && loc.lng),
  };
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={options}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
}
class MiniMap extends React.Component {
  render() {
    return (
      <div className='mini-map'>
        <div>Location / Contacts</div>
        <div>
          <MinMap providerL={this.props.providerL} />
        </div>
        <div>adress</div>
        <div>Media</div>
      </div>
    );
  }
}

export default MiniMap;
