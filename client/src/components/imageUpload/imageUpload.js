import React from 'react';
import constants from '../constants/Queries';
import axios from 'axios';
const jwt = require('jsonwebtoken');

class ImageUpload extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null,
    postStatus: '',
    selectedFile: null,
  };

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] }, async () => {
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
            this.props.getImgUrl(response.data.secure_url);
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
          <form>
            <div className='form-group'>
              <input type='file' onChange={this.onFileChange} />
              <br></br>
            </div>
            <span>{}</span>
          </form>
        </section>
      </main>
    );
  }
}

export default ImageUpload;
