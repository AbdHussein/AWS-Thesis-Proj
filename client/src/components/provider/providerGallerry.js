import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class ProviderGallery extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <div className="gallery">
                        <div className="gallery-img">
                            <img src={require(`../../images/29.jpg`)} alt="Gallery Image" />
                            <div className="img-overlay">
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProviderGallery;