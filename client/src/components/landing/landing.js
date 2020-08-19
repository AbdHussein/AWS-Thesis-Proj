import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import {
  faSearch,
  faMapMarkerAlt,
  faBars,
  faMobileAlt,
  faPlay,
  faMapMarked,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faApple, faAndroid, faFacebook, faTwitter, faGooglePlusG, faLinkedinIn, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Redirect } from 'react-router-dom';
import Navbar from '../mainComp/navbar';
import Footer from '../footer/footer';
import Constants from '../constants/Queries';
import $ from 'jquery';

class Landing extends React.Component {
  state = {
    search: '',
    location: '',
    category: '',
    user: null,
    done: false,
  };

  async componentDidMount() {
    if (localStorage.getItem('xTown')) {
      const query = Constants.getUserByToken(localStorage.getItem('xTown'));
      const request = await Constants.request(query);
      const { user } = request.data.data;
      this.setState({
        user,
      });
    }

    $('.categories span').click(function () {
      $('.categories').children('input').fadeToggle();
      $('.categories').children('ul').fadeToggle();
    })

    function filterFunction() {
      var input, filter, ul, li, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myDropdown");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }


  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    if (this.state.category !== '') {
      this.setState({
        done: true,
      });
    }
  }

  render() {
    if (this.state.done) {
      return (
        <Redirect
          to={{
            pathname: '/map',
            state: {
              category: this.state.category,
            },
          }}
        />
      );
    }
    if (this.state.user && this.state.user.RoleID == 2) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard',
          }}
        />
      );
    }
    return (
      <div className='landing'>
        <Navbar provider={this.state.user} />
        {/* Start Header */}
        <header>
          <div className='overlay'>
            <Container>
              <h1>Explore Best Places In City</h1>
              <h3>
                Find some of the best tips from around the city from our
                partners and friends.
              </h3>

              <div className='search-bar'>
                <div className='search'>
                  <FontAwesomeIcon icon={faKeyboard} />
                  <input
                    type='text'
                    name='search'
                    placeholder='What Are You Looking For?'
                    value={this.state.search}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className='between'></div>
                <div className='location'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <input
                    type='text'
                    name='location'
                    placeholder='Location'
                    value={this.state.location}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className='between'></div>
                <div className='categories'>
                  <FontAwesomeIcon icon={faBars} />
                  <span>All Categories <FontAwesomeIcon icon={faChevronDown} /></span>
                  <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()" />
                  <ul id="myDropdown">
                    <li>Phones</li>
                    <li>Restaurant</li>
                  </ul>
                </div>
                <div className='between'></div>
                <div className='search-button'>
                  <button onClick={this.handleSubmit.bind(this)}>
                    Search <FontAwesomeIcon icon={faSearch} />{' '}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </header>
        {/* End Header */}

        <div className='popular-palces'>
          <Container>
            <h2>Popular Palces</h2>
            <hr className='landing-hr' />
            <p>
              Mauris ac maximus neque. Nam in mauris quis libero sodales
              eleifend. Morbi varius, nulla sit amet rutrum elementum.
            </p>
            <div className='popular-slider'>
              <div className='single-popular'>
                <img src={require(`../../images/29.jpg`)} alt='Silder Image' />
                <div className='overlay'>
                  <div>
                    <h3>Gym in the center</h3>
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> 70 Bright St New
                      York, USA
                    </span>
                    <hr />
                    <p>
                      <FontAwesomeIcon icon={faMobileAlt} />{' '}
                      <span className='categories'>Phones</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <div className='landing-promo'>
            <div className='overlay'>
              <h5>Aliquam erat volutpat interdum</h5>
              <p>Get ready to start your exciting journey.</p>
              <p>Our agency will lead you through the amazing digital world</p>
              <button>
                <FontAwesomeIcon icon={faPlay} /> <span>Promo Video</span>{' '}
              </button>
            </div>
          </div>
        </div>
        <div className="how-it-work">
          <h2>How it works</h2>
          <hr />
          <p>Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.</p>
          <Container>
            <div className="content">
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus tellus ut, convallis eros sollicitudin turpis.</p>
                <span>01</span>
              </div>
            </div>
            <div className="content">
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus tellus ut, convallis eros sollicitudin turpis.</p>
                <span>02</span>
              </div>
            </div>
            <div className="content">
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>Proin dapibus nisl ornare diam varius tempus. Aenean a quam luctus, finibus tellus ut, convallis eros sollicitudin turpis.</p>
                <span>03</span>
              </div>
            </div>
          </Container>
        </div>
        <div className="clear"></div>
        <div className="mobile-app">
          <div className="info">
            <h4>Our App Will Be Available Soon</h4>
            <p>In ut odio libero, at vulputate urna. Nulla tristique mi a massa convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida. Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit.</p>
            <button><FontAwesomeIcon icon={faApple} /> <span>Apple Store</span></button>
            <button><FontAwesomeIcon icon={faAndroid} /> <span>Google Play</span></button>
          </div>
          <div className="app-img">
            <img src={require(`../../images/api.png`)} alt="API Picture" />
            <div className="img-animation">
              <img src={require(`../../images/animation.jpg`)} alt="Animation Picture" />
            </div>
          </div>
        </div>
        <div className="our-team">
          <h2>Our Team</h2>
          <hr />
          <p>This Is Our Developers</p>
          <div>
            <Container>
              <div className="team-img">
                <img src={require(`../../images/ibrahim.jpg`)} alt="" />
              </div>
              <div className="team-info">
                <h3>Ibrahim Abu Nemer</h3>
                <p>Back-End Developer</p>
                <ul>
                  <li><a className="facebook" href="http://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a className="twitter" href="http://www.twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a className="instagram" href="http://www.instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className="team-img">
                <img src={require(`../../images/abd.jpg`)} alt="" />
              </div>
              <div className="team-info">
                <h3>Abdulrahmaan</h3>
                <p>Back-End Developer</p>
                <ul>
                  <li><a className="facebook" href="http://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a className="twitter" href="http://www.twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a className="instagram" href="http://www.instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className="team-img">
                <img src={require(`../../images/azzam.jpg`)} alt="" />
              </div>
              <div className="team-info">
                <h3>Ahmed E. Azzam</h3>
                <p>Team Leader</p>
                <ul>
                  <li><a className="facebook" href="http://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a className="twitter" href="http://www.twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a className="instagram" href="http://www.instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className="team-img">
                <img src={require(`../../images/nadera.jpg`)} alt="" />
              </div>
              <div className="team-info">
                <h3>Nadera Qaoud</h3>
                <p>Front-End Developer</p>
                <ul>
                  <li><a className="facebook" href="http://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a className="twitter" href="http://www.twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a className="instagram" href="http://www.instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className="team-img">
                <img className="waked" src={require(`../../images/avatar.png`)} alt="" />
              </div>
              <div className="team-info">
                <h3>Ahmed Abuwaked</h3>
                <p>Front-End Developer</p>
                <ul>
                  <li><a className="facebook" href="http://www.facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                  <li><a className="twitter" href="http://www.twitter.com" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a className="instagram" href="http://www.instagram.com" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                </ul>
              </div>
            </Container>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Landing;
