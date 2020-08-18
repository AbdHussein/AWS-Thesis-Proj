import React from 'react';
import ImageUpload from '../../imageUpload/imageUpload';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import Constatnts from '../../constants/Queries';

class Description extends React.Component {
  state = {
    description: '',
    imgUrl: '',
  };

  componentDidMount(){
    $('.MuiCircularProgress-svg').hide();
  }

  uploadStarted(){
    $('.MuiCircularProgress-svg').show();
    $('.upload-gallery').hide();
  }

  updateImgUrl(url) {
    this.setState({
      imgUrl: url,
    }, () => {
      $('.MuiCircularProgress-svg').hide();
      $('.upload-gallery').show();
    });
  }

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  async addDescription() {
    const addDescQuery = Constatnts.addDesc(
      this.props.id,
      this.state.description
    );
    const request = await Constatnts.request(addDescQuery);
    alert('Description Added');
  }

  async addPhoto() {
    const addPhotoQuery = Constatnts.addPhoto(this.props.id, this.state.imgUrl);
    const request = await Constatnts.request(addPhotoQuery);
    alert('Photo Saved!');
  }

  render() {
    return (
      <div className='description-dash'>
        <div className='description-div'>
          <h2>Add your Description</h2>
          <div className='description-div-inner'>
            <textarea
              className='post-area'
              name='description'
              cols='60'
              rows='10'
              value={this.state.text}
              onChange={this.handelChange.bind(this)}
            ></textarea>
            <button
              className='description-btn'
              onClick={this.addDescription.bind(this)}
            >
              Add Description
            </button>
          </div>
        </div>

        <div className='gallrey'>
          <h2>Add Photos To Your Gallrey</h2>
          <div className='upload-gallrey-img'>
            <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} uploadStarted={this.uploadStarted.bind(this)}/>
            <br></br>
            <div>
              <CircularProgress />
            </div>
            <br></br>
            <button
              className='upload-gallery'
              onClick={this.addPhoto.bind(this)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
