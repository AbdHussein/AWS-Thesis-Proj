import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Constants from '../constants/Queries';

class ProviderPosts extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // const query = Constants.getUserByToken(localStorage.getItem('xTown'));
    // const requestForProviderID = await Constants.request(query);
    // const provider = requestForProviderID.data.data.user;
    // const allPostsQuery = Constants.getPostByProviderID(provider.id);
    // const requestForPosts = await Constants.request(allPostsQuery);
    // this.setState({
    //   posts: requestForPosts.data.data.posts,
    // });
  }

  render() {
    return (
      <div>
        <Container>
          <div className='posts'>
            <div className='post-img'>
              <img src={require(`../../images/29.jpg`)} alt='Post Image' />
            </div>
            <div className='post-describe'>
              <h2>Best Restaurants in London.</h2>
              <p>
                Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla.
                Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in
                mauris quis libero sodales eleifend. Morbi varius, nulla sit
                amet rutrum elementum, est elit finibus tellus, ut tristique
                elit risus at metus.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar.
                Donec a consectetur nulla. Nulla posuere sapien vitae lectus
                suscipit, et pulvinar nisi tincidunt...
              </p>
              <hr />
              <div className='post-info'>
                <span>
                  <FontAwesomeIcon icon={faCalendar} /> 27 December 2017
                </span>
                <button>
                  View Post <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProviderPosts;
