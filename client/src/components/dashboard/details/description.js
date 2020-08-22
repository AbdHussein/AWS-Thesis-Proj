import React from 'react';
import ImageUpload from '../../imageUpload/imageUpload';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import swal from 'sweetalert';
import $ from 'jquery';
import Constatnts from '../../constants/Queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Description extends React.Component {
  state = {
    description: '',
    imgUrl: '',
    allGallery: null,
  };

  async componentDidMount() {
    await this.getGallery();
    $('#descriptionProgress').hide();
    $('.gallery').hover(function () {
      $(this).children('.overlay-gallery').toggle(200);
    });
  }

  async getGallery() {
    const allGalleryQuery = Constatnts.getAllGalary(this.props.id);
    const request = await Constatnts.request(allGalleryQuery);
    this.setState({
      allGallery: request.data.data.gallery,
    });
  }

  uploadStarted() {
    $('#descriptionProgress').show();
    $('.upload-gallery').hide();
  }

  updateImgUrl(url) {
    this.setState(
      {
        imgUrl: url,
      },
      () => {
        $('#descriptionProgress').hide();
        $('.upload-gallery').show();
      }
    );
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
    swal('Good job!', 'Perfect the description successfully added', 'success');
  }

  async addPhoto() {
    const addPhotoQuery = Constatnts.addPhoto(this.props.id, this.state.imgUrl);
    const request = await Constatnts.request(addPhotoQuery);
    await this.getGallery();
    swal(
      'Good job!',
      'Perfect photo successfully added to your gallery',
      'success'
    );
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
            <ImageUpload
              getImgUrl={this.updateImgUrl.bind(this)}
              uploadStarted={this.uploadStarted.bind(this)}
            />
            <br></br>
            <div id='descriptionProgress'>
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
        {/* <div className="success-description-main">
          <div className="success-description">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect the description successfully added.</p>
          </div>
        </div>
        <div className="success-gallery-main">
          <div className="success-gallery">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect photo successfully added to your gallery.</p>
          </div>
        </div> */}
        <h2>Show Gallery</h2>
        <div className='show-gallery'>
          {this.state.allGallery &&
            this.state.allGallery.map((gallery, i) => (
              <div className='gallery' key={i}>
                <img src={gallery.image} alt='Dash Gallery' />
                <div className='overlay-gallery'>
                  <span
                    onClick={async () => {
                      const deleteImg = Constatnts.deleteImage(gallery.id);

                      try {
                        const request = await Constatnts.request(deleteImg);
                        await this.getGallery();
                        swal(
                          'Good job!',
                          'Perfect the delete successfully done',
                          'success'
                        );
                      } catch (error) {
                        swal('OoOps!', 'The operation failed', 'error');
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Description;
