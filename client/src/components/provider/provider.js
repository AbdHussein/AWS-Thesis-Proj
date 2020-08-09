import React from 'react'
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faHamburger, faInfo, faUtensils, faShare, faEllipsisH, faVideo, faChevronDown, faChevronRight, faWifi, faBicycle, faCloud, faShoppingCart, faPaw, faRocket, faSmile, faUsers, faAward, faMobileAlt, faClipboard, faStore } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faComments, faEye, faImages, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Rating from '@material-ui/lab/Rating';
import ProviderDetails from './providerDetails';
import ProviderPosts from './providerPosts';
import ProviderGallery from './providerGallerry';
import ProviderStore from './providerStore';
import ProviderReviews from './providerReviews';
import Footer from '../footer/footer';

class Provider extends React.Component {


    render() {
        const [value] = '80';
        return (
            <div className="provider">
                <Navbar />
                <div className="provider-header">
                    <div className="overlay">
                        <Container>
                            <div className="provider-ui">
                                <div className="provider-info">
                                    <h1>Iconic Cafe in Manhattan</h1>
                                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> 70 Bright St New York, USA</span>
                                    <span><FontAwesomeIcon icon={faPhoneAlt} /> +123456789</span>
                                    <span><FontAwesomeIcon icon={faEnvelope} />email@email.com</span>
                                </div>
                                <div className="rating">
                                    <div className="rate-number">
                                        5.0
                                </div>
                                    <div>
                                        <Rating value='5' readOnly />
                                        <p>17.5K reviews</p>
                                    </div>
                                    <div className="chat">
                                        <FontAwesomeIcon icon={faComments} />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="provider-bottom-header">
                                <p><FontAwesomeIcon icon={faMobileAlt} /></p>
                                <p><FontAwesomeIcon icon={faHeart} /> Bookmark - 516</p>
                                <p><FontAwesomeIcon icon={faEye} /> Viewed - 54.7K</p>
                            </div>
                        </Container>
                    </div>
                </div>
                <div className="provider-nav">
                    <Container>
                        <div className="categories">
                            <ul>
                                <li className="active" data-type=".provider-details"><FontAwesomeIcon icon={faInfo} /> Details</li>
                                <li data-type=".provider-posts"><FontAwesomeIcon icon={faClipboard} /> Posts</li>
                                <li data-type=".provider-gallery"><FontAwesomeIcon icon={faImage} /> Gallery</li>
                                <li data-type=".provider-store"><FontAwesomeIcon icon={faStore} /> Store</li>
                                <li data-type=".provider-reviews"><FontAwesomeIcon icon={faComments} /> Reviews</li>
                            </ul>
                        </div>
                        <div className="sharing">
                            <button><FontAwesomeIcon icon={faShare} /> Share</button>
                            <button><FontAwesomeIcon icon={faHeart} /> Save</button>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                    </Container>
                </div>
                <div className="provider-content">
                    <div className="provider-details">
                        <ProviderDetails />
                    </div>
                    <div className="provider-posts">
                        <ProviderPosts />
                    </div>
                    <div className="provider-gallery">
                        <ProviderGallery />
                    </div>
                    <div className="provider-store">
                        <ProviderStore />
                    </div>
                    <div className="provider-reviews">
                        <ProviderReviews />
                    </div>
                </div>
                <div className="provider-sidebar">
                    sidebar
                </div>
            </div>
        )
    }

}

export default Provider