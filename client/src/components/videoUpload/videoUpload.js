import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

class VideoUpload extends React.Component {
  state = {
    videoUrl: null,
    videoAlt: null,
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
    // Update the state
    this.setState({ selectedFile: event.target.files[0] }, async () => {
      this.props.uploadStarted();
      this.handleVideoUpload();
    });
  };

  handleVideoUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('upload_preset', 'pm0oht2i');
    console.log(this.state.selectedFile);
    axios
      .post('https://api.cloudinary.com/v1_1/xtown/video/upload', formData)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            videoUrl: response.data.secure_url,
            videoAlt: `A video of ${response.data.original_filename}`,
          },
          async () => {
            this.props.getVidUrl(response.data.secure_url);
          }
        );
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to upload file');
      });
  };

  render() {
    const { videoUrl, videoAlt } = this.state;
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
              id='file-2'
              className='inputfile inputfile-1'
              data-multiple-caption='{count} files selected'
              onChange={this.onFileChange.bind(this)}
            />
            <label htmlFor='file-2'>
              <FontAwesomeIcon icon={faImage} />{' '}
              <span className='add-photos'>Add Video</span>
            </label>
          </div>
        </section>
      </main>
    );
  }
}

export default VideoUpload;
