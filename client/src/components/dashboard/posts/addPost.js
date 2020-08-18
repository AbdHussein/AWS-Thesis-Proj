import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import ImageUpload from '../../imageUpload/imageUpload';
import constants from '../../constants/Queries';
const jwt = require('jsonwebtoken');

class Add extends React.Component {
  state = {
    text: '',
    imgUrl: null,
  };

  componentDidMount(){
    $('.MuiCircularProgress-svg').hide();
  }

  uploadStarted(){
    $('.MuiCircularProgress-svg').show();
    $('.btn').hide();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  updateImgUrl(url) {
    this.setState({
      imgUrl: url,
    }, () => {
      $('.MuiCircularProgress-svg').hide();
      $('.btn').show();
    });
  }

  async onSubmit() {
    console.log(this.state.imgUrl);
    try {
      const data = jwt.verify(
        localStorage.getItem('xTown'),
        'somesuperdupersecret',
        {
          algorithm: 'HS256',
        }
      );
      const addPost = await constants.addPost(
        data.id,
        this.state.imgUrl,
        this.state.text
      );
      constants
        .request(addPost)
        .then((result) => {
          if (result.data.errors) {
            alert('Failed add Photo');
          }else{
            alert('Post Added');
          }
        })
        .catch((err) => {
          alert('Failed add Photo');
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className='dash-add'>
        <h2>Add your Post</h2>
        <form>
          <h4>What Is New?!</h4>
          <textarea
            className='post-area'
            name='text'
            cols='80'
            rows='10'
            value={this.state.text}
            onChange={this.handleChange.bind(this)}
          ></textarea>
          {/* <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/> */}
          <h4>Choose Post's Image</h4>
          <div className='upload'>
            <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} uploadStarted={this.uploadStarted.bind(this)}/>
          </div>
          <br></br>
            <div>
              <CircularProgress />
            </div>
          <br></br>
          <button
            type='button'
            className='btn'
            onClick={this.onSubmit.bind(this)}
          >
            Add Post
          </button>
        </form>
      </div>
    );
  }
}
export default Add;
