import React from 'react';
import Navbar from '../mainComp/navbar';
import Filter from '../mainComp/filterComp';
//import dotenv from 'dotenv';

// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
// function Maps() {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 31.3547, lng: 34.3088 }}
//     />
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Maps));
/*******/
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 31.3547, lng: 34.3088 }}
    ></GoogleMap>
  ))
);

class Map extends React.Component {
  render() {
    //dotenv.config('../../.env');
    //console.log(process.env.REACT_APP_GOOGLE_KEY);
    return (
      <div className='map'>
        <Navbar />
        <MyMapComponent
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC3_XzpMoxUOzce4hJIVzfV3NgyicTTDLI`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {/* <div className='map-header' style={{ width: '100vw', hight: '100vh' }}>
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ hight: `100%` }} />}
            containerElement={<div style={{ hight: `100%` }} />}
            mapElement={<div style={{ hight: `100%` }} />}
          />
        </div> */}
        <Filter />
      </div>
    );
  }
}
export default Map;
