import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faHamburger, faInfo, faUtensils, faShare, faEllipsisH, faVideo, faChevronDown, faChevronRight, faWifi, faBicycle, faCloud, faShoppingCart, faPaw, faRocket, faSmile, faUsers, faAward, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faComments, faEye, faImages, faImage } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


class ProviderDetails extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <div className="provider-promo">
                        <button><FontAwesomeIcon icon={faVideo} /> <span>Promo Video</span></button>
                    </div>
                    <div className="provider-description">
                        <div>Description <FontAwesomeIcon icon={faChevronDown} /></div>
                        <div>
                            <p>Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris aliquet eu quam id ornare. Morbi ac quam enim. Cras vitae nulla condimentum, semper dolor non, faucibus dolor. Vivamus adipiscing eros quis orci fringilla, sed pretium lectus viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec velit non odio aliquam suscipit. Sed non neque faucibus, condimentum lectus at, accumsan enim.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</p>
                            <button>Visit Website <FontAwesomeIcon icon={faChevronRight} /></button>
                        </div>
                    </div>
                    <div className="provider-features">
                        <div>Listing Features <FontAwesomeIcon icon={faChevronDown} /></div>
                        <div>
                            <ul>
                                <li><FontAwesomeIcon icon={faRocket} /> Elevator Building</li>
                                <li><FontAwesomeIcon icon={faWifi} /> Free Wi-Fi</li>
                                <li><FontAwesomeIcon icon={faBicycle} /> Free Parking</li>
                                <li><FontAwesomeIcon icon={faCloud} /> Air Condition</li>
                                <li><FontAwesomeIcon icon={faShoppingCart} /> Online Ordering</li>
                                <li><FontAwesomeIcon icon={faPaw} /> Pet Friendly</li>
                            </ul>
                        </div>
                    </div>
                    <div className="provider-photos">
                        <div>Gallery / Photos <FontAwesomeIcon icon={faChevronDown} /></div>
                        <div>test</div>
                    </div>
                    <div className="provider-single-fact">
                        <div>
                            <div className="fac">
                                <p>245</p>
                                <h6>New Visiters Every Week</h6>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faSmile} />
                            </div>
                        </div>
                        <div>
                            <div className="fac">
                                <p>3251</p>
                                <h6>Happy customers every year</h6>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </div>
                        </div>
                        <div>
                            <div className="fac">
                                <p>15</p>
                                <h6>Won Award</h6>
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon icon={faAward} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProviderDetails;