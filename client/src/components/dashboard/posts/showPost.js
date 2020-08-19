import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Constants from '../../constants/Queries';

class Show extends React.Component {
  async componentDidMount() {
    
    $('.edit-icon').hover(function () {
      $(this).siblings('.edit-hover').toggle();
    });
    $('.delete-icon').hover(function () {
      $(this).siblings('.delete-hover').toggle();
    });
  }

  async handleDelete(id) {
    const mutation = Constants.deletePost(id);
    await Constants.request(mutation);
    const query = Constants.getUserByToken(localStorage.getItem('xTown'));
    const requestForProviderID = await Constants.request(query);
    const provider = requestForProviderID.data.data.user;
    const allPostsQuery = Constants.getPostByProviderID(provider.id);
    const requestForPosts = await Constants.request(allPostsQuery);
    this.setState({
      posts: requestForPosts.data.data.posts,
    });
  }

  async handleEdit(id) {
    console.log('Edit clicked');
  }

  render() {
    return (
      <div className='dash-show'>
        <h1>Your Posts</h1>
        {this.props.posts && this.props.posts.map((post, index) => {
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
                <FontAwesomeIcon
                  icon={faEdit}
                  className='edit-icon'
                  onClick={() => {
                    this.handleEdit(post.id);
                  }}
                />
                <p className='edit-hover'>Edit</p>
                <FontAwesomeIcon
                  icon={faTrash}
                  className='delete-icon'
                  onClick={() => {
                    this.handleDelete(post.id);
                    this.props.posts.splice(index,1);
                  }}
                />
                <p className='delete-hover'>Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Show;
