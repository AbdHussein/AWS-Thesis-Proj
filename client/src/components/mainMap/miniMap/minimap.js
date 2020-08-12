import React from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import mapStyles from './minmapStyle';
import { Container } from '@material-ui/core';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '320px',
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function MinMap(props) {
  const provider = props.providerL && props.providerL.location;
  var loc = JSON.parse(provider);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapload = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const center = {
    lat: Number(loc && loc.lat),
    lng: Number(loc && loc.lng),
  };
  const position = {
    lat: Number(loc && loc.lat),
    lng: Number(loc && loc.lng),
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return 'Error loading Map';
  if (!isLoaded) return 'Loading...';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
        onLoad={onMapload}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}

class MiniMap extends React.Component {
  render() {
    return (
      <Container>
        <div className='mini-map'>
          <div>Location / Contacts</div>
          <div>
            <MinMap providerL={this.props.providerL} />
          </div>
          <div>adress</div>
          <div>Media</div>
        </div>
      </Container>
    );
  }
}

export default MiniMap;
