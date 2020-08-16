import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faHamburger,
  faInfo,
  faUtensils,
  faShare,
  faEllipsisH,
  faVideo,
  faChevronDown,
  faChevronRight,
  faWifi,
  faBicycle,
  faCloud,
  faShoppingCart,
  faPaw,
  faRocket,
  faSmile,
  faUsers,
  faAward,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faComments,
  faEye,
  faImages,
  faImage,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class ProviderDetails extends React.Component {
  render() {
    const { provider } = this.props;
    return (
      <div>
        <Container>
          <div className='provider-promo'>
            <button>
              <FontAwesomeIcon icon={faVideo} /> <span>Promo Video</span>
            </button>
          </div>
          <div className='provider-description'>
            <div>
              Description <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div>
              <p>{provider.description}</p>
            </div>
          </div>
          <div className='provider-features'>
            <div>
              Listing Features <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faRocket} /> Elevator Building
                </li>
                <li>
                  <FontAwesomeIcon icon={faWifi} /> Free Wi-Fi
                </li>
                <li>
                  <FontAwesomeIcon icon={faBicycle} /> Free Parking
                </li>
                <li>
                  <FontAwesomeIcon icon={faCloud} /> Air Condition
                </li>
                <li>
                  <FontAwesomeIcon icon={faShoppingCart} /> Online Ordering
                </li>
                <li>
                  <FontAwesomeIcon icon={faPaw} /> Pet Friendly
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProviderDetails;
