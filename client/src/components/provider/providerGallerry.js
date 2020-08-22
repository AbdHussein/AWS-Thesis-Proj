import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import watermelon from '../../main';
import Constants from '../constants/Queries';
import Footer from '../footer/footer';

class ProviderGallery extends React.Component {
  state = {
    photos: [],
  };
  async componentDidMount() {
    const allPhotosQuery = Constants.getAllGalary(this.props.id);
    const requestForPhotos = await Constants.request(allPhotosQuery);
    this.setState({
      photos: requestForPhotos.data.data.gallery,
    });
    watermelon();
  }
  render() {
    return (
      <div>
        <Container>
          <div className='gallery'>
            {this.state.photos.map((photo, i) => {
              return (
                <div key={i}>
                  <div className='gallery-img'>
                    <img src={photo.image} alt='Gallery Image' />
                    <div className='img-overlay'>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </div>
                  <div className='img-popup'>
                    <FontAwesomeIcon icon={faTimes} />
                    <img src={photo.image} alt='Gallery Image' />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default ProviderGallery;
