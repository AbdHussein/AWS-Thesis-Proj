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

class ViewPost extends React.Component {
  state = {
    post: null,
    user: null,
    provider: null,
    comment: '',
    allComments: [],
    commentUser: null,
    likes: 0
  };

  async componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push('/');
      return;
    }
    // get post from Redirect
    const { post } = this.props.location.state;
    this.setState({
      post,
    });
    // get user info if he signed in
    if (localStorage.getItem('xTown')) {
      const getUserByToken = Constants.getUserByToken(
        localStorage.getItem('xTown')
      );
      const requestForUser = await Constants.request(getUserByToken);
      var user = requestForUser.data.data.user;
    } else {
      this.props.history.push('/');
      return;
    }
    // git provider info by postID
    var provider = await this.getUserNameForComment(post.userID);
    // put data in the state
    this.setState({
      user: user || null,
      provider,
    });
    await this.getAllComments();
  }

  async getAllComments() {
    // git comments By postID
    const commentsQuery = Constants.getAllCommentsByPostID(this.state.post.id);
    const allComments = await Constants.request(commentsQuery);
    this.setState({
      allComments: allComments.data.data.comments,
    });
  }

  getAllLikes(){
    
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  async hanldeSubmit(e) {
    e.preventDefault();
    if (localStorage.getItem('xTown')) {
      const addComment = Constants.addComment(
        this.state.user.id,
        this.state.post.id,
        this.state.comment
      );
      const request = await Constants.request(addComment);
      this.getAllComments();
    } else {
      alert('Please sign in to comment');
      // nadera
    }
  }

  async getUserNameForComment(userID) {
    const getProviderById = Constants.getProviderById(userID);
    const requestForProvider = await Constants.request(getProviderById);
    var provider = requestForProvider.data.data.user;
    return provider;
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
              {this.state.allComments.map((comment, i) => {
                return (
                  <div className='real-comment' key={i}>
                    <div className='post-img'>
                      <Avatar className='avatar'>{comment.user.avatar}</Avatar>
                    </div>
                    <div className='comment'>
                      <h3>{comment.user.username}</h3>
                      <p>{comment.text}</p>
                      <hr />
                      <FontAwesomeIcon icon={faCalendar} />{' '}
                      <span>{comment.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='add-comments'>
              <div>
                Add Comment
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div>
                <form>
                  <textarea
                    name='comment'
                    id=''
                    cols='30'
                    rows='10'
                    onChange={this.handleChange.bind(this)}
                  ></textarea>
                  <button onClick={this.hanldeSubmit.bind(this)}>
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
