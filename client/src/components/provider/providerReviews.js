import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCalendarAlt,
  faPaperPlane,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import Constants from '../constants/Queries';
import ImageUpload from '../imageUpload/imageUpload';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';

class ProviderReviews extends React.Component {
  state = {
    rating: '2.5',
    text: '',
    pic: '',
    reviews: null,
  };
  async componentDidMount() {
    await this.getAllReviews();    
    $('.MuiCircularProgress-svg').hide();
  }

  uploadStarted(){
    $('.MuiCircularProgress-svg').show();
    $('#btn').hide();
  }

  async getAllReviews() {
    const allReviewsQuery = Constants.getAllReviews(this.props.id);
    const request = await Constants.request(allReviewsQuery);
    this.setState({
      reviews: request.data.data.getReviews,
    });
  }

  updateImgUrl(url) {
    this.setState({
      pic: url,
    },() => {
      $('.MuiCircularProgress-svg').hide();
      $('#btn').show();
    });
  }

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async addReview() {
    if (localStorage.getItem('xTown')) {
      const getUserByToken = Constants.getUserByToken(
        localStorage.getItem('xTown')
      );
      const requestForUser = await Constants.request(getUserByToken);
      var user = requestForUser.data.data.user;
      const addReview = Constants.addReview(
        this.props.id,
        user.id,
        this.state.text,
        this.state.rating,
        this.state.pic
      );
      const request = await Constants.request(addReview);
      this.getAllReviews();
      this.setState({
        rating: '2.5',
        text: '',
        pic: '',
      })
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className='reviews-head'>
            <h2> Reviews</h2>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className='reviews-comments'>
            {/* <Rating value={2} readOnly /> */}
            {this.state.reviews && this.state.reviews.map((review, i) => {

              return (
                <div className='comments' key={i}>
                  <div className='img-comment'>
                    <Avatar className='avatar'>{review.user.avatar}</Avatar>
                  </div>
                  <div className='text-comment'>
                    <h3>{review.user.username}</h3>
                    <Rating precision={0.5} value={review.rating} readOnly />
                    <p>{review.text}</p>
                    <div className='reviews-img'>
                      <img src={review.pic} />
                    </div>
                    <hr />
                    <span className="calender">
                      <FontAwesomeIcon icon={faCalendarAlt} /> {review.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='add-reviews-head'>
            <h3>Add Review</h3>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className='reviews-rating'>
            <Rating
              defaultValue={2.5}
              precision={0.5}
              name='rating'
              onChange={this.handelChange.bind(this)}
            />
          </div>
          <div className='add-reviews'>
            <textarea
              placeholder='Enter Your Reviews'
              name='text'
              onChange={this.handelChange.bind(this)}
            ></textarea>
            <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} uploadStarted={this.uploadStarted.bind(this)}/>
            <br></br>
            <div>
              <CircularProgress />
            </div>
            <br></br>
            <button id='btn' onClick={this.addReview.bind(this)}>
              Submit Reviews <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProviderReviews;
