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
import Constants from '../constants/Queries';
import jwt from 'jsonwebtoken';

class Provider extends React.Component {
  state = {
    provider: null,
    categoryName: '',
    user: null,
    numOfReviews: 0,
    avgRating: 0,
    workingHours: null,
    bookmarks : 0
  };

  async componentDidMount() {
    waterMelon();
    const { provider } = this.props.location.state;
    this.setState({
      provider,
      workingHours: JSON.parse(provider.workingHours),
    }, () => {
      this.getBookmarks();      
    });    
    const categoryQuery = Constants.categoryNameByID(provider.categoryID);
    const request = await Constants.request(categoryQuery);
    this.setState({
      categoryName: request.data.data.getCategoryByID.category,
    });
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const request = await Constants.request(query);
      const { user } = request.data.data;
      this.setState({
        user,
      });
    }
  }

  getBookmarks(){
    const bookmarksQuery = Constants.getBookmarksByProvider(this.state.provider.id);
    Constants.request(bookmarksQuery).then(res => {
      if(res.data.Errors){
        console.log('Error while getting bookmarks');
      } else {
        this.setState({
          bookmarks : res.data.data.bookmark.length
        })
      }
    }).catch(err => {
      console.log('Error while getting bookmarks');
    })
  }

  getNumOfReviews(numOfReviews, avgRating) {
    this.setState({
      numOfReviews,
      avgRating,
    });
  }

  addBookmark(){
    const addBookmarkMutation = Constants.addBookmark(this.state.user.id, this.state.provider.id);
    Constants.request(addBookmarkMutation)
    .then(res => {
      if(res.data.Errors){
        alert('Error in saving this Profile');
      } else {
        this.setState({
          bookmarks : this.state.bookmarks + 1
        })
      }
    }).catch(err => {
      alert('Error in saving this Profile');
    })
  }

  render() {
    const [value] = '80';
    return (
      <div className='provider'>
        <Navbar provider={this.state.user} />
        <div
          style={{
            backgroundImage: `url(${
              this.state.provider && this.state.provider.cover
            })`,
          }}
          className='provider-header'
        >
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
                  <div className='rate-number'>
                    {this.state.avgRating
                      ? Math.round(this.state.avgRating)
                      : 0}
                  </div>
                  <div>
                    <Rating value={Math.round(this.state.avgRating)} readOnly />
                    <p>{this.state.numOfReviews} reviews</p>
                  </div>
                  <div className='chat'>
                    <FontAwesomeIcon icon={faComments} />
                  </div>
                </div>
              </div>
              <hr />
              <div className='provider-bottom-header'>
                <p>
                  {this.state.provider !== null &&
                  this.state.categoryName === 'phones' ? (
                    <FontAwesomeIcon icon={faMobileAlt} />
                  ) : (
                    <FontAwesomeIcon icon={faUtensils} />
                  )}
                  <span>
                    {this.state.provider !== null
                      ? this.state.categoryName
                      : ''}
                  </span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faHeart} /> Bookmark - {this.state.bookmarks}
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
              <button onClick = {() => {
                if(localStorage.getItem('xTown')){
                  // alert('Saved');
                  this.addBookmark();
                } else {
                  this.props.history.push('/signIn');
                }
              }}>
                <FontAwesomeIcon icon={faHeart} /> Save
              </button>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </Container>
        </div>
        <div className='provider-content'>
          <div className='provider-details'>
            {this.state.provider && (
              <ProviderDetails provider={this.state.provider} />
            )}
          </div>
          <div className='provider-posts'>
            {this.state.provider && (
              <ProviderPosts id={this.state.provider.id} />
            )}
          </div>
          <div className='provider-gallery'>
            {this.state.provider && (
              <ProviderGallery id={this.state.provider.id} />
            )}
          </div>
          <div className='provider-store'>
            {this.state.provider && (
              <ProviderStore id={this.state.provider.id} />
            )}
          </div>
          <div className='provider-reviews'>
            {this.state.provider && (
              <ProviderReviews
                id={this.state.provider.id}
                getNumOfReviews={this.getNumOfReviews.bind(this)}
              />
            )}
          </div>
        </div>
        <div className='provider-sidebar'>
          <Container>
            <div className='working-hours'>
              <div>
                <h3>
                  Working Hours <FontAwesomeIcon icon={faChevronDown} />
                </h3>
              </div>
              <div>
                <ul>
                  <li>
                    Saturday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Saturday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Saturday'][1]}
                    </pre>
                  </li>
                  <li>
                    Sunday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Sunday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Sunday'][1]}
                    </pre>
                  </li>
                  <li>
                    Monday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Monday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Monday'][1]}
                    </pre>
                  </li>
                  <li>
                    Tuseday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Tuseday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Tuseday'][1]}
                    </pre>
                  </li>
                  <li>
                    Wednesday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Wednesday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Wednesday'][1]}
                    </pre>
                  </li>
                  <li>
                    Thursday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Thursday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Thursday'][1]}
                    </pre>
                  </li>
                  <li>
                    Friday
                    <pre>
                      {' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Friday'][0]}{' '}
                      -{' '}
                      {this.state.workingHours &&
                        this.state.workingHours['Friday'][1]}
                    </pre>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
          <MiniMap providerL={this.state.provider} />
        </div>
      </div>
    );
  }
}

export default Provider;
