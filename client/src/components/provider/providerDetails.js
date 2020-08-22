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
  faSmoking,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faComments,
  faEye,
  faImages,
  faImage,
  faMoneyBillAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Constants from '../constants/Queries';
import Background from '../../images/48.jpg';

class ProviderDetails extends React.Component {
  state = {
    facility: [
      { id: 0, value: faWifi },
      { id: 1, value: faShoppingCart },
      { id: 2, value: faRocket },
      { id: 3, value: faCloud },
      { id: 4, value: faPaw },
      { id: 5, value: faBicycle },
      { id: 6, value: faSmoking },
      { id: 7, value: faMoneyBillAlt },
      { id: 8, value: faBookmark },
    ],
    allFs: null,
  };

  async componentDidMount() {
    const getAllFsQuery = Constants.getFacilities(this.props.provider.id);
    const request = await Constants.request(getAllFsQuery);
    this.setState({
      allFs: JSON.parse(request.data.data.user.facilities),
    });
  }

  render() {
    const { provider } = this.props;
    return (
      <div>
        <Container>
          {
            console.log(provider)
          }
          <div
            style={{ backgroundImage: `url(${provider.thumbnail})` }}
            className='provider-promo'
          >
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
                {this.state.allFs &&
                  this.state.allFs.map((fac, i) => {
                    return (
                      <li key={i}>
                        <FontAwesomeIcon
                          icon={
                            this.state.facility[fac.id] &&
                            this.state.facility[fac.id].value
                          }
                        />{' '}
                        {fac.value}
                      </li>
                    );
                  })}
                {/* <li>
                  <FontAwesomeIcon icon={this.state.facility[2].value} />{' '}
                  Elevator Building
                </li> */}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProviderDetails;
