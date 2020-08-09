import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

class Footer extends Component {
    state = {};
    render() {
        return (
            <div className="main-footer">
                <div className="subscribe">
                    <Container>
                        <div>
                            <h4>
                                <strong>
                                    Subscribe For <span>a Newsletter</span>
                                </strong>
                            </h4>
                            <h5>Whant to be notified about new locations ? Just sign up.</h5>
                        </div>
                        <div>
                            <input type="email" placeholder="  Enter Your Email" />
                        </div>
                    </Container>
                </div>
                <div className="footer-news">
                    <Container>
                        <div className="contact">
                            <p>
                                All what you are looking for, make your life easy
                <br />
                known what is new by one press
              </p>
                            <ul className="cotact-list">
                                <li>
                                    <MailOutlineIcon />
                                    <span>Mail: xtwon@gmail.com</span>
                                </li>
                                <li>
                                    <LocationOnIcon />
                                    <span>Adress: Palestine Gaza Remal </span>
                                </li>
                                <li>
                                    <PhoneEnabledIcon />
                                    <span>Phone: +970 00000000</span>
                                </li>
                            </ul>
                        </div>

                        <div className="last-news">
                            <h3>Our Last News</h3>
                            <div>
                                <div>
                                    <img
                                        src="https://townhub.kwst.net/images/all/4.jpg"
                                        alt="last news"
                                    />
                                </div>

                                <div>
                                    <p>
                                        Vivamus dapibus rutrum
                    <br />
                                        <span>
                                            <CalendarTodayIcon />
                      21 Aug 2020
                    </span>
                                    </p>
                                    <hr />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <img
                                        src="https://townhub.kwst.net/images/all/2.jpg"
                                        alt="last news"
                                    />
                                </div>

                                <div>
                                    <p>
                                        In hac habitasse platea
                    <br />
                                        <span>
                                            <CalendarTodayIcon />
                      20 Aug 2020
                    </span>
                                    </p>
                                    <hr />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <img
                                        src="https://townhub.kwst.net/images/all/7.jpg"
                                        alt="last news"
                                    />
                                </div>

                                <div>
                                    <p>
                                        Tortor tempor in porta
                    <br />
                                        <span>
                                            <CalendarTodayIcon />
                      19 Aug 2020
                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="twitter">
                            <h3>Our Twitter</h3>
                            <ul className="cotact-list">
                                <li>
                                    <p>
                                        Do you work with video? Help us improve our video offering
                    by taking this quick 2 minute survey. http://enva.to/cJjBP{" "}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        {" "}
                    Cyber Monday Sale starts now! Check out all the amazing
                    assets you can get for 50% off this week:
                    http://enva.to/yfz7- #envatosale
                  </p>
                                </li>
                                <li>
                                    <p>
                                        Some of the best WordPress Themes & Plugins are now also
                    available on Envato Elements! http://enva.to/I0rkW{" "}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </div>
                <div className="copyright">copyright &copy; x-twon</div>
            </div>
        );
    }
}
export default Footer;
