import React, { useState } from 'react';
import Navbar from '../mainComp/navbar';
import Filter from '../mainComp/filterComp';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { formatRelative } from 'data-fns';
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

import Constants from '../constants/Queries';
import { faMapMarkerAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '70vh',
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function MyComponent(props) {
  const [selectedProvider, setSelectedProvider] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [lat, setLat] = React.useState(37.2431);
  const [lng, setLng] = React.useState(-34.3088);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });
  const allProviders = props.providers;

  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  const locationData = (stringObj) => {
    return JSON.parse(stringObj);
  };

  const mapRef = React.useRef();
  const onMapload = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);
  const centerProvider = props.loc && {
    lat: Number(props.loc.lat),
    lng: Number(props.loc.lng),
  };
  const center = {
    lat: lat,
    lng: lng,
  };

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
      {/* <h1>{props.category}</h1> */}
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={centerProvider || center}
        options={options}
        onLoad={onMapload}
      >
        {allProviders &&
          allProviders.map((provider, index) => {
            var loc = locationData(provider.location);
            return (
              <Marker
                key={index}
                position={{
                  lat: Number(loc.lat),
                  lng: Number(loc.lng),
                }}
                icon={{
                  url: './mapIcon.svg',
                  scaledSize: new window.google.maps.Size(20, 25),
                }}
                onClick={() => {
                  setSelectedProvider(provider);
                  console.log(selectedProvider);
                  // console.log(JSON.parse(selectedProvider.location).lat);
                }}
              />
            );
          })}
        <Marker
          position={{
            lat: lat,
            lng: lng,
          }}
          icon={{
            url: './currLoc.png',
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {selectedProvider && (
          <InfoWindow
            position={{
              lat: Number(locationData(selectedProvider.location).lat),
              lng: Number(locationData(selectedProvider.location).lng),
            }}
            onCloseClick={() => {
              setSelectedProvider(null);
            }}
          >
            <div className="map-view">
              <div className="img-view-map">
                <img src={require(`../../images/29.jpg`)} alt="Map Cover" />
              </div>
              <h2>{selectedProvider.serviceName}</h2>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <span>W 85th St, New York, USA</span></p>
              <button
                onClick={() => {
                  setProvider(selectedProvider);
                }}
              >
                Details <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

/****************************************************************/

function Locate({ panTo }) {
  return (
    <button
      className='locate'
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
          options
        );
      }}
    >
      <img src={require('../../images/geo.png')} alt='compass - locate me' />
    </button>
  );
}

/******************   why this func is exist   ****************************/

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 31.3547,
        lng: () => 34.3088,
        radius: 200 * 1000,
      },
    },
  });
  return (
    <div className='search'>
      <Combobox
        onSelect={(address) => {
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder='Enter an address'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

/**********************************************/

class Map extends React.Component {
  state = {
    category: '',
    providers: [],
    user: null,
    loc: null,
  };

  async componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/');
      return;
    }
    const { category } = this.props.location.state;
    this.setState({
      category,
    });
    await this.getUsers(category);
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const request = await Constants.request(query);
      const { user } = request.data.data;
      this.setState({
        user,
      });
    }
    const loc = this.props.location && this.props.location.state.loc;
    this.setState({ loc });
  }

  async getUsers(category) {
    if (category !== 'all') {
      const USERS = Constants.userByCategory(category);
      console.log(USERS);
      const request = await Constants.request(USERS);
      this.setState({
        providers: request.data.data.usersByCategory,
      });
    } else {
      const USERS = Constants.getUsersByRoleID(2);
      const request = await Constants.request(USERS);
      this.setState({
        providers: request.data.data.getUsers,
      });
    }
  }

  async setCategory(category) {
    this.setState({
      category,
    });
    await this.getUsers(category);
  }

  render() {
    return (
      <div className='map'>
        <Navbar provider={this.state.user} />
        <MyComponent providers={this.state.providers} loc={this.state.loc} />
        <Filter setCategory={this.setCategory.bind(this)} />
      </div>
    );
  }
}
export default Map;
