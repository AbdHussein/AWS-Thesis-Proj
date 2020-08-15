import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../../mainComp/navbar';
import Avatar from '@material-ui/core/Avatar';
import {
  faCalendar,
  faEye,
  faTags,
  faChevronDown,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Constants from '../../constants/Queries';
import { post } from 'jquery';

class ViewPost extends React.Component {
  state = {
    post: null,
    user: null,
    provider: null,
  };

  async componentDidMount() {
    const { post } = this.props.location.state;
    if (localStorage.getItem('xTown')) {
      const getUserByToken = Constants.getUserByToken(
        localStorage.getItem('xTown')
      );
      const requestForUser = await Constants.request(getUserByToken);
      var user = requestForUser.data.data.user;
    }
    const getProviderById = Constants.getProviderById(post.userID);
    const requestForProvider = await Constants.request(getProviderById);
    var provider = requestForProvider.data.data.user;
    this.setState({
      post,
      user: user || null,
      provider,
    });
  }

  render() {
    return (
      <div className='view-post'>
        <Navbar provider={this.state.user} />
        <Container>
          <div className='main-view-post'>
            <div className='whole-post'>
              <div className='img'>
                <img
                  src={this.state.post && this.state.post.image}
                  alt='View Post Image'
                />
              </div>
              <div className='str'>
                <p>{this.state.post && this.state.post.text}</p>
                <hr />
                <div className='poster-info'>
                  <Avatar className='avatar'>
                    {this.state.provider && this.state.provider.username[0]}
                  </Avatar>
                  <p>
                    By, {this.state.provider && this.state.provider.username}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCalendar} />{' '}
                    {this.state.post && this.state.post.date}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEye} /> 251
                  </p>
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name='checkedH'
                      />
                    }
                    label={this.state.post && this.state.post.likes + ' Like'}
                  />
                </div>
              </div>
            </div>
            <div className='posts-comments'>
              <div>
                Comments <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div>
                <div className='post-img'>
                  <Avatar className='avatar'>N</Avatar>
                </div>
                <div className='comment'>
                  <h3>Ibrahim Nemer</h3>
                  <p>
                    " Donec quam felis, ultricies nec, pellentesque eu, pretium
                    quis, sem. Nulla consequat massa quis enim. Donec pede
                    justo, fringilla vel, aliquet nec, vulputate eget, arcu. In
                    enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                    Nullam dictum felis eu pede mollis pretium. "
                  </p>
                  <hr />
                  <FontAwesomeIcon icon={faCalendar} />{' '}
                  <span>12 April 2018</span>
                </div>
              </div>
            </div>
            <div className='add-comments'>
              <div>
                Add Comment
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div>
                <form>
                  <textarea name='comment' id='' cols='30' rows='10'></textarea>
                  <button>
                    Submit Comment <FontAwesomeIcon icon={faPaperPlane} />{' '}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className='sidebar-post'>sidebar</div>
        </Container>
      </div>
    );
  }
}

export default ViewPost;
