import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Constants from '../../constants/Queries';

class Show extends React.Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    $('.edit-icon').hover(function () {
      $(this).siblings('p:first-of-type').toggle();
    });
    $('.delete-icon').hover(function () {
      $(this).siblings('p:last-of-type').toggle();
    });

    const query = Constants.getUserByToken(localStorage.getItem('xTown'));
    const requestForProviderID = await Constants.request(query);
    const provider = requestForProviderID.data.data.user;
    const allPostsQuery = Constants.getPostByProviderID(provider.id);
    const requestForPosts = await Constants.request(allPostsQuery);
    this.setState({
      posts: requestForPosts.data.data.posts,
    });
  }

  render() {
    return (
      <div className='dash-show'>
        {this.state.posts.map((post, index) => {
          return (
            <div className='post-block' key={index}>
              <div className='post-img-div'>
                {' '}
                <img src={post.image} />
                {/* <img src='https://townhub.kwst.net/images/all/1.jpg' /> */}
              </div>
              <div className='post-descri-div'>
                {/* <h4>New Version for huawai</h4>
                <p>40 Journal Square Plaza, NJ, USA</p> */}
                <h4>{post.text}</h4>
                <p>{post.date}</p>
              </div>
              <div className='post-edit-delete'>
                <FontAwesomeIcon icon={faEdit} className='edit-icon' />
                <p>Edit</p>
                <FontAwesomeIcon icon={faTrash} className='delete-icon' />
                <p>Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Show;
