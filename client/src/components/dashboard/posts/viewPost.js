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
import Loading from '../../mainComp/loading';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class ViewPost extends React.Component {
  state = {
    post: null,
    user: null,
    provider: null,
    comment: '',
    allComments: [],
    commentUser: null,
    likes: 0,
    likeID: 0,
    liked: '',
    isSigned: false,
  };

  async componentDidMount() {
    if (this.props.location.state === undefined) {
      console.log('errrrror');
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
    }
    // git provider info by postID
    var provider = await this.getUserNameForComment(post.userID);
    // put data in the state
    this.setState(
      {
        user: user || null,
        provider,
      },
      () => {
        this.getAllLikes();
      }
    );
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

  getAllLikes() {
    const getLikesQuery = Constants.getLikesByPostID(this.state.post.id);
    Constants.request(getLikesQuery)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log('Error in retriving this post likes');
        } else {
          console.log(res.data.data.getLikesByPostID.length);
          this.setState(
            {
              likes: res.data.data.getLikesByPostID.length,
            },
            () => {
              res.data.data.getLikesByPostID.map((like) => {
                if (like.userID === this.state.user.id) {
                  this.setState({
                    likeID: like.id,
                    liked: true,
                  });
                }
              });
            }
          );
        }
      })
      .catch((err) => {
        console.log('Error in retriving this post likes');
      });
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (localStorage.getItem('xTown')) {
      const addComment = Constants.addComment(
        this.state.user.id,
        this.state.post.id,
        this.state.comment
      );
      const request = await Constants.request(addComment);
      swal('Good job!', 'Perfect the review successfully added.', 'success');
      this.getAllComments();
    } else {
      this.setState({
        isSigned: true,
      });
    }
  }

  addLike() {
    // console.log('executed');
    if (localStorage.getItem('xTown')) {
      const addLikeMutation = Constants.addLike(
        this.state.user.id,
        this.state.post.id
      );
      console.log(addLikeMutation);
      Constants.request(addLikeMutation)
        .then((res) => {
          if (res.data.errors) {
            console.log('error in adding like to this post');
          } else {
            this.getAllLikes();
          }
        })
        .catch((err) => {
          console.log('error in adding like to this post');
        });
    } else {
      this.props.history.push('/signIn');
    }
  }

  removeLike() {
    const deleteLikeMutation = Constants.deleteLike(this.state.likeID);
    console.log(deleteLikeMutation);
    Constants.request(deleteLikeMutation)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log('Error in removing like');
        } else {
          this.getAllLikes();
        }
      })
      .catch((err) => {
        console.log('Error in removing like');
      });
  }

  async getUserNameForComment(userID) {
    const getProviderById = Constants.getProviderById(userID);
    const requestForProvider = await Constants.request(getProviderById);
    var provider = requestForProvider.data.data.user;
    return provider;
  }

  render() {
    if (this.state.isSigned) {
      return (
        <Redirect
          to={{
            pathname: `/signIn`,
          }}
        />
      );
    }
    return (
      <div className='view-post'>
        <Loading />
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
                        id='checkedH'
                        onClick={() => {
                          if (!this.state.liked) {
                            this.addLike();
                          } else {
                            this.removeLike();
                          }
                        }}
                      />
                    }
                    label={this.state.likes + ' Likes'}
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
                  <button onClick={this.handleSubmit.bind(this)}>
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
