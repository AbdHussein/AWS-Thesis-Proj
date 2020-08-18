import React from 'react';
import constants from '../constants/Queries';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
const jwt = require('jsonwebtoken');

class ImageUpload extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
    postStatus: '',
    selectedFile: null,
  };

  componentDidMount() {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener('change', function (e) {
        var fileName = '';
        if (this.files && this.files.length > 1)
          fileName = (this.getAttribute('data-multiple-caption') || '').replace(
            '{count}',
            this.files.length
          );
        else fileName = e.target.value.split('\\').pop();

        if (fileName) label.querySelector('span').innerHTML = fileName;
        else label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener('focus', function () {
        input.classList.add('has-focus');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
      });
    });
  }
  onFileChange = (event) => {

    console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    // Update the state
    this.setState({ selectedFile: event.target.files[0] }, async () => {
      this.props.uploadStarted();
      this.handleImageUpload();
    });
  };

  handleImageUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', 'pm0oht2i');
    console.log(this.state.selectedFile);
    axios
      .post('https://api.cloudinary.com/v1_1/xtown/image/upload', formData)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            imageUrl: response.data.secure_url,
            imageAlt: `An image of ${response.data.original_filename}`,
          },
          async () => {
            await this.props.getImgUrl(response.data.secure_url);
          }
        );
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to upload file');
      });
  };

  render() {
    const { imageUrl, imageAlt } = this.state;
    return (
      <main className='App'>
        <section className='left-side'>
          {/* <div className='form-group'>
              <input type='file' onChange={this.onFileChange} />
              <br></br>
            </div>
            <span>{}</span> */}

          <div className='box'>
            <input
              type='file'
              name='pics'
              id='file-1'
              className='inputfile inputfile-1'
              data-multiple-caption='{count} files selected'
              onChange={this.onFileChange.bind(this)}
            />
            <label htmlFor='file-1'>
              <FontAwesomeIcon icon={faImage} />{' '}
              <span className='add-photos'>Add Photo</span>
            </label>
          </div>
        </section>
      </main>
    );
  }
}

export default ImageUpload;
