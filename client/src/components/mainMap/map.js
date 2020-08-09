import React, { useState } from 'react';
import Navbar from '../mainComp/navbar';
import Filter from '../mainComp/filterComp';
import { Redirect } from 'react-router-dom';
//import { formatRelative } from 'data-fns';
import * as allData from '../../data/data.json';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import mapStyles from './mapStyle';

const center = {
  lat: 31.3547,
  lng: 34.3088,
};

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function MyComponent() {
  // componentDidMount() {
  //   const { provider } = this.props.location.state;
  //   this.setState({
  //     provider,
  //   });
  // }
  const [selectedProvider, setSelectedProvider] = React.useState(null);
  const [provider, setProvider] = React.useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });
  if (loadError) return 'Error loading Map';
  if (!isLoaded) return 'Loading...';
  /* the magic if statment*/
  if (provider !== null) {
    return (
      <Redirect
        to={{
          pathname: `/provider`,
          state: {
            provider,
          },
        }}
      />
    );
  }
  /* end of  the magic if statment*/
  return (
    <div>
      {/* <h1 className='logo'>
        X Town{' '}
        <span role='img' aria-label='tent'>
          ✖
        </span>
      </h1> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
      >
        {allData.data.map((provider, index) => (
          <Marker
            key={index}
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
              <h2>{selectedProvider.service_name}</h2>
              <h4>phone: {selectedProvider.phone}</h4>
              <button
                onClick={() => {
                  setProvider(selectedProvider);
                }}
              >
                {/* {for fron-end dev. : remove the border of the button} */}
                Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
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
