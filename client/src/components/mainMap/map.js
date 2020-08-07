import React, { useState } from 'react';
import Navbar from '../mainComp/navbar';
import Filter from '../mainComp/filterComp';
import * as allData from '../../data/data.json';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 31.3547, lng: 34.3088 }}>
      {allData.data.map((row) => (
        <Marker position={{ lat: Number(row.lat), lng: Number(row.lng) }} />
      ))}
    </GoogleMap>
  ))
);

class Map extends React.Component {
  render() {
    return (
      <div className='map'>
        <Navbar />
        <MyMapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC3_XzpMoxUOzce4hJIVzfV3NgyicTTDLI`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <Filter />
      </div>
    );
  }
}
export default Map;
