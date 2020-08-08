import React, { useState } from 'react';
import Navbar from '../mainComp/navbar';
import Filter from '../mainComp/filterComp';

import * as allData from '../../data/data.json';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 31.3547,
  lng: 34.3088,
};

function MyComponent() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  return (
    <LoadScript googleMapsApiKey='AIzaSyC3_XzpMoxUOzce4hJIVzfV3NgyicTTDLI'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {allData.data.map((provider) => (
          <Marker
            position={{ lat: Number(provider.lat), lng: Number(provider.lng) }}
            onClick={() => {
              setSelectedProvider(provider);
            }}
          />
        ))}
        {selectedProvider && (
          <InfoWindow
            position={{
              lat: Number(selectedProvider.lat),
              lng: Number(selectedProvider.lng),
            }}
            onCloseClick={() => {
              setSelectedProvider(null);
            }}
          >
            <div>
              <h2>{selectedProvider.pos}</h2>
              <p>phone: {selectedProvider.phone}</p>
              <h5></h5>
            </div>
          </InfoWindow>
        )}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

class Map extends React.Component {
  render() {
    return (
      <div className='map'>
        <Navbar />
        <MyComponent />
        <Filter />
      </div>
    );
  }
}
export default Map;
