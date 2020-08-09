import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Footer from '../footer/footer';

class ProviderGallery extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <div className="gallery">
                        <div>
                            <div className="gallery-img">
                                <img src={require(`../../images/29.jpg`)} alt="Gallery Image" />
                                <div className="img-overlay">
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>
                            <div className="img-popup">
                                <FontAwesomeIcon icon={faTimes} />
                                <img src={require(`../../images/29.jpg`)} alt="Gallery Image" />
                            </div>
                        </div>
                        <div>
                            <div className="gallery-img">
                                <img src={require(`../../images/48.jpg`)} alt="Gallery Image" />
                                <div className="img-overlay">
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>
                            <div className="img-popup">
                                <FontAwesomeIcon icon={faTimes} />
                                <img src={require(`../../images/48.jpg`)} alt="Gallery Image" />
                            </div>
                        </div>
                        <div>
                            <div className="gallery-img">
                                <img src={require(`../../images/6.jpg`)} alt="Gallery Image" />
                                <div className="img-overlay">
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>
                            <div className="img-popup">
                                <FontAwesomeIcon icon={faTimes} />
                                <img src={require(`../../images/6.jpg`)} alt="Gallery Image" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProviderGallery;