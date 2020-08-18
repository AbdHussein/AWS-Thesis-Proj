import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Constants from '../constants/Queries';
import { Redirect } from 'react-router-dom';

class ProviderPosts extends React.Component {
  state = {
    posts: null,
    viewPost: false,
    post: null,
  };

  async componentDidMount() {
    const allPostsQuery = Constants.getPostByProviderID(this.props.id);
    const requestForPosts = await Constants.request(allPostsQuery);
    this.setState({
      posts: requestForPosts.data.data.posts,
    });
  }

  render() {
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
      <div>
        <Container>
          {this.state.posts && this.state.posts.map((post, i) => {
            return (
              <div className='posts' key={i}>
                <div className='post-img'>
                  <img src={post.image} alt='Post Image' />
                </div>
                <div className='post-describe'>
                  <p>{post.text}</p>
                  <hr />
                  <div className='post-info'>
                    <span>
                      <FontAwesomeIcon icon={faCalendar} /> {post.date}
                    </span>
                    <button
                      onClick={() => {
                        this.setState({
                          viewPost: true,
                          post,
                        });
                      }}
                    >
                      View Post <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default ProviderPosts;
