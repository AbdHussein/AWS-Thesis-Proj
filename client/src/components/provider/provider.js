import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MiniMap from '../mainMap/miniMap/minimap';
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
  faClipboard,
  faStore,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faComments,
  faEye,
  faImages,
  faImage,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Rating from '@material-ui/lab/Rating';
import ProviderDetails from './providerDetails';
import ProviderPosts from './providerPosts';
import ProviderGallery from './providerGallerry';
import ProviderStore from './providerStore';
import ProviderReviews from './providerReviews';
import Footer from '../footer/footer';
import waterMelon from '../../main';
import axios from 'axios';
import Constants from '../constants/Queries';

class Provider extends React.Component {
  state = {
    provider: null,
    categoryName: '',
  };

  async componentDidMount() {
    waterMelon();
    const { provider } = this.props.location.state;
    this.setState({
      provider,
    });
    console.log(provider.categoryID);
    const categoryQuery = Constants.categoryNameByID(provider.categoryID);
    console.log(categoryQuery);
    await axios
      .post('http://localhost:5000/api', {
        query: categoryQuery,
      })
      .then((response) => {
        this.setState({
          categoryName: response.data.data.getCategoryByID.category,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const [value] = '80';
    return (
      <div className='provider'>
        <Navbar />
        <div className='provider-header'>
          <div className='overlay'>
            <Container>
              <div className='provider-ui'>
                <div className='provider-info'>
                  <h1>
                    {this.state.provider !== null
                      ? this.state.provider.serviceName
                      : ''}
                  </h1>
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {this.state.provider !== null
                      ? this.state.provider.address
                      : ''}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPhoneAlt} />{' '}
                    {this.state.provider !== null
                      ? this.state.provider.mobile
                      : ''}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                    {this.state.provider !== null
                      ? this.state.provider.email
                      : ''}
                  </span>
                </div>
                <div className='rating'>
                  <div className='rate-number'>5.0</div>
                  <div>
                    <Rating value={5} readOnly />
                    <p>17.5K reviews</p>
                  </div>
                  <div className='chat'>
                    <FontAwesomeIcon icon={faComments} />
                  </div>
                </div>
              </div>
              <hr />
              <div className='provider-bottom-header'>
                <p>
                  <FontAwesomeIcon icon={faMobileAlt} />
                  {this.state.provider !== null ? this.state.categoryName : ''}
                </p>
                <p>
                  <FontAwesomeIcon icon={faHeart} /> Bookmark - 516
                </p>
                <p>
                  <FontAwesomeIcon icon={faEye} /> Viewed - 54.7K
                </p>
              </div>
            </Container>
          </div>
        </div>
        <div className='provider-nav'>
          <Container>
            <div className='categories'>
              <ul>
                <li className='active' data-type='.provider-details'>
                  <FontAwesomeIcon icon={faInfo} /> Details
                </li>
                <li data-type='.provider-posts'>
                  <FontAwesomeIcon icon={faClipboard} /> Posts
                </li>
                <li data-type='.provider-gallery'>
                  <FontAwesomeIcon icon={faImage} /> Gallery
                </li>
                <li data-type='.provider-store'>
                  <FontAwesomeIcon icon={faStore} /> Store
                </li>
                <li data-type='.provider-reviews'>
                  <FontAwesomeIcon icon={faComments} /> Reviews
                </li>
              </ul>
            </div>
            <div className='sharing'>
              <button>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
              <button>
                <FontAwesomeIcon icon={faHeart} /> Save
              </button>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </Container>
        </div>
        <div className='provider-content'>
          <div className='provider-details'>
            <ProviderDetails />
          </div>
          <div className='provider-posts'>
            <ProviderPosts />
          </div>
          <div className='provider-gallery'>
            <ProviderGallery />
          </div>
          <div className='provider-store'>
            <ProviderStore />
          </div>
          <div className='provider-reviews'>
            <ProviderReviews />
          </div>
        </div>
        <div className='provider-sidebar'>
          <MiniMap />
        </div>
      </div>
    );
  }
}

export default Provider;
