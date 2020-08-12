import React from 'react';
import constants from '../constants/Queries';
const jwt = require('jsonwebtoken');

class ImageUpload extends React.Component{
  state = {
    imageUrl: null,
    imageAlt: null,
    postStatus: ""
  }

  handleImageUpload = () => {
    // get the first input element with the type of file
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'pm0oht2i');
    const options = {
      method: 'POST',
      body: formData,
    };    
    // replace cloudname with your Cloudinary cloud_name
    return fetch('https://api.Cloudinary.com/v1_1/xtown/image/upload', options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          imageUrl: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`
        }, async () => {
          try{
            const data = jwt.verify(localStorage.getItem('xTown'), 'somesuperdupersecret', {
              algorithm: 'HS256',
            });

            const addPost = constants.addPost(data.id, this.state.imageUrl, this.props.text);
            console.log(addPost);
            const request = await constants.request(addPost);            
          }catch(err){
            console.log(err);
          }
        })
      }).catch(err => console.log(err));
  }

  render() {
    const { imageUrl, imageAlt } = this.state;
    return (
      <main className="App">
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>
              <button type="button" className="btn" onClick={this.handleImageUpload}>{this.props.ButtonText}</button>
              <span>{}</span>
          </form>
        </section>
      </main>
    );
  }
}

export default ImageUpload;