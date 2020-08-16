import React from 'react';
import ImageUpload from '../../imageUpload/imageUpload';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Constatnts from '../../constants/Queries';
class Description extends React.Component {
  state = {
    description: '',
    imgUrl: '',
  };

  updateImgUrl(url) {
    this.setState({
      imgUrl: url,
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
  }

  async addPhoto() {
    const addPhotoQuery = Constatnts.addPhoto(this.props.id, this.state.imgUrl);
    const request = await Constatnts.request(addPhotoQuery);
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
            <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} />
            <button
              className='upload-gallery'
              onClick={this.addPhoto.bind(this)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
