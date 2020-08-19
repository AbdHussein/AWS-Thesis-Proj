import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../mainComp/navbar';
import Constants from '../constants/Queries';
import { Redirect } from 'react-router-dom';

class Feeds extends React.Component {
  state = {
    user: null,
    allPosts: [],
    viewPost: false,
    post: null,
  };

  async componentDidMount() {
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const request = await Constants.request(query);
      const { user } = request.data.data;
      const postsQuery = Constants.getPostByFavProv(user.id);
      const postsRequest = await Constants.request(postsQuery);
      const providers = [];
      postsRequest.data.data.bookmark.map((bookmark) => {
        providers.push(bookmark.provider);
      });
      const ps = [];
      providers.map((prov) => {
        ps.push(prov.posts);
      });

      this.setState({
        user,
        allPosts: this.state.allPosts.concat(...ps),
      });
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
    ///////////////////////////*needs work for ibrahim*///////////////////////////////////
    if (this.state.viewPost) {
      return (
        <Redirect
          to={{
            pathname: `/post`,
            state: {
              post: this.state.post,
            },
          }}
        />
      );
    }
    return (
      <div className='feeds'>
        <Navbar provider={this.state.user} />
        <header>
          <div className='overlay'>
            <Container>
              <h2>Our Last News</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec
                tincidunt arcu, sit amet fermentum sem.
              </p>
            </Container>
          </div>
        </header>
        <Container>
          <div className='feeds-content'>
            {/* Start Post */}
            {this.state.allPosts &&
              this.state.allPosts.map((post, i) => {
                return (
                  <div className='feeds-post' key={i}>
                    <div className='feeds-img'>
                      <img src={post.image} alt='Feeds Image' />
                    </div>
                    <div className='feeds-post-content'>
                      <p>{post.text}</p>
                      <hr />
                      <FontAwesomeIcon icon={faCalendar} />{' '}
                      <span>{post.date}</span>{' '}
                      <button
                        onClick={() => {
                          this.setState({
                            viewPost: true,
                            post,
                          });
                        }}
                      >
                        Read More <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
                );
              })}
            {/* End Post */}
          </div>
          <div className='feeds-sidebar'>Test From Sidebar</div>
        </Container>
      </div>
    );
  }
}

export default Feeds;
