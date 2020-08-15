import React from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
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
          <div className="map-adress">
            <ul>
              <li><LocationOnIcon /><span>Address:</span><span> Palestine Gaza </span></li>
              <li><PhoneEnabledIcon /><span>Phone:</span><span>+970 0000000 </span></li>
              <li><MailOutlineIcon /><span>Mail:</span><span> email@gmail.com </span></li>
            </ul>
          </div>
          <div><FacebookIcon /> <TwitterIcon /> <InstagramIcon/></div>
        </div>
      </Container>
    );
  }
}

export default MiniMap;
