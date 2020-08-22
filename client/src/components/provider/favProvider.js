import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import Constants from '../constants/Queries';
import Footer from '../footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkedAlt,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class FavProviders extends React.Component {
  state = {
    user: null,
    bookmarks: null,
    prov: null,
  };

  async componentDidMount() {
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const request = await Constants.request(query);
      const { user } = request.data.data;
      const allProvidersQuery = Constants.getProvidersByBookmarks(user.id);
      const requsetForProviders = await Constants.request(allProvidersQuery);
      console.log(allProvidersQuery);
      console.log(requsetForProviders.data);
      const bookmarks = requsetForProviders.data.data.bookmarks;
      this.setState(
        {
          user,
          bookmarks,
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    if (this.state.user && this.state.user.RoleID == 2) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
          }}
        />
      );
    }
    if (this.state.prov) {
      return (
        <Redirect
          to={{
            pathname: '/provider',
            state: {
              provider: this.state.prov,
            },
          }}
        />
      );
    }
    return (
      <div>
        <Navbar provider={this.state.user} />
        <div className='fav-provider'>
          <Container>
            <div className='fav-content'>
              {this.state.bookmarks &&
                this.state.bookmarks.map((bookmark, i) => {
                  return (
                    <div className='fav' key={i}>
                      <div className='fav-cover'>
                        <img
                          src={
                            bookmark.provider.cover !== 'cover'
                              ? bookmark.provider.cover
                              : require(`../../images/29.jpg`)
                          }
                          // require(`../../images/29.jpg`)
                          alt='Fav Provider Image'
                        />
                      </div>
                      <div className='fav-info'>
                        <h4>{bookmark.provider.username}</h4>
                        <span>
                          <FontAwesomeIcon icon={faMapMarkedAlt} />{' '}
                          {bookmark.provider.address}
                        </span>
                      </div>
                      <div className='fav-options'>
                        {/* <button>unsaved</button> */}
                        <button
                          onClick={() => {
                            this.setState({
                              prov: bookmark.provider,
                            });
                          }}
                        >
                          Visit <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className='fav-sidebar'>
              <img src={require(`../../images/ads2.jpg`)} alt='Ads Photo' />
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FavProviders;
