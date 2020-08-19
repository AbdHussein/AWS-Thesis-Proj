import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import $ from 'jquery';
import Constants from '../../constants/Queries';

class Show extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const requestForProviderID = await Constants.request(query);
      const provider = requestForProviderID.data.data.user;
      const allPostsQuery = await Constants.getPostByProviderID(provider.id);
      const requestForPosts = await Constants.request(allPostsQuery);
      this.setState({
        posts: requestForPosts.data.data.posts,
      });
    }

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
                  }}
                />
                <p className='delete-hover'>Delete</p>
              </div>
            </div>
          );
        })}
        <div className="drop-delete">
          <div className="delete-waring">
            <h3>
              <ErrorOutlineIcon />
              <span>Delete this post</span>
            </h3>
            <hr />
            <p>
              Do you want to <strong>DELETE</strong> this post?
            </p>
            <button className="yes-btn">Yes</button>
            <button className="no-btn">No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
