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
import {
  faApple,
  faAndroid,
  faTwitter,
  faLinkedinIn,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { Redirect } from 'react-router-dom';
import Navbar from '../mainComp/navbar';
import Footer from '../footer/footer';
import Constants from '../constants/Queries';
import $ from 'jquery';

class Landing extends React.Component {
  state = {
    search: '',
    location: '',
    category: 'all',
    categoryPlace: 'All Categories',
    user: null,
    done: false,
    providers: null,
    serviceName: '',
    loc: null,
    serviceNamePlace: '',
    prov: null,
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
    await this.getUsers(this.state.category);
    $('.categories span').click(function () {
      $('.categories').children('input').fadeToggle();
      $('.categories').children('ul').fadeToggle();
    });
    $('.search span').click(function () {
      $('.search').children('input').fadeToggle();
      $('.search').children('ul').fadeToggle();
    });
  }

  filterFunction() {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('myDropdown');
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  async getUsers(category) {
    if (category !== 'all') {
      const USERS = Constants.userByCategory(category);
      console.log(USERS);
      const request = await Constants.request(USERS);
      this.setState({
        providers: request.data.data.usersByCategory,
      });
    } else {
      const USERS = Constants.getUsersByRoleID(2);
      const request = await Constants.request(USERS);
      this.setState({
        providers: request.data.data.getUsers,
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    if (
      this.state.category === 'all' ||
      this.state.category === 'phones' ||
      this.state.category === 'restaurant'
    ) {
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
              loc: this.state.loc,
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
    if (this.state.prov) {
      return (
        <Redirect
          to={{
            pathname: '/provider',
            state: {
              provider: this.state.prov,
            },
          }}
        />
      );
    }
    const providers = this.state.providers;
    // get 3 provider random
    var providerOne =
      providers && providers[Math.floor(Math.random() * providers.length)];
    var providerTwo =
      providers && providers[Math.floor(Math.random() * providers.length)];
    var providerThree =
      providers && providers[Math.floor(Math.random() * providers.length)];

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
                {/* Ibrahim To Do */}
                <div className='search'>
                  <FontAwesomeIcon icon={faKeyboard} />
                  <span>
                    {this.state.serviceNamePlace === ''
                      ? 'looking for ?'
                      : this.state.serviceNamePlace}{' '}
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                  <input
                    type='text'
                    placeholder='Search..'
                    id='myInput'
                    onKeyUp={this.filterFunction.bind(this)}
                    name='serviceNamePlace'
                    onChange={this.handleChange.bind(this)}
                  />
                  <ul
                    id='myDropdown'
                    style={{ overflowY: 'auto', height: '20vh' }}
                  >
                    {this.state.providers &&
                      this.state.providers.map((provider, i) => {
                        var loc = JSON.parse(provider.location);
                        loc.lat = Number(loc.lat);
                        loc.lng = Number(loc.lng);

                        return (
                          <li
                            key={i}
                            onClick={() => {
                              this.setState({
                                serviceName: provider.serviceName,
                                serviceNamePlace: provider.serviceName,
                                loc,
                              });
                            }}
                          >
                            {provider.serviceName}
                          </li>
                        );
                      })}
                  </ul>
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
                  <span>
                    {this.state.categoryPlace}{' '}
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                  <input
                    type='text'
                    placeholder='Search..'
                    id='myInput'
                    onKeyUp={this.filterFunction.bind(this)}
                    name='category'
                    onChange={this.handleChange.bind(this)}
                  />
                  <ul id='myDropdown'>
                    <li
                      onClick={() => {
                        this.setState(
                          {
                            category: 'all',
                            categoryPlace: 'All Categories',
                          },
                          async () => {
                            await this.getUsers(this.state.category);
                          }
                        );
                      }}
                    >
                      All Categories
                    </li>
                    <li
                      onClick={() => {
                        this.setState(
                          {
                            category: 'phones',
                            categoryPlace: 'Phones',
                          },
                          async () => {
                            await this.getUsers(this.state.category);
                          }
                        );
                      }}
                    >
                      Phones
                    </li>
                    <li
                      onClick={() => {
                        this.setState(
                          {
                            category: 'restaurant',
                            categoryPlace: 'Restaurant',
                          },
                          async () => {
                            await this.getUsers(this.state.category);
                          }
                        );
                      }}
                    >
                      Restaurant
                    </li>
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
              <div
                className='single-popular'
                onClick={() => {
                  this.setState({
                    prov: providerOne,
                  });
                }}
              >
                <img
                  src={providerOne && providerOne.cover}
                  alt='Silder Image'
                />
                <div className='overlay'>
                  <div>
                    <h3>{providerOne && providerOne.serviceName}</h3>
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                      {providerOne && providerOne.address}
                    </span>
                    <hr />
                    <p>
                      <FontAwesomeIcon icon={faMobileAlt} />{' '}
                      <span className='categories'>
                        {providerOne &&
                          providerOne.categoryName &&
                          providerOne.categoryName.category}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className='single-popular'
                onClick={() => {
                  this.setState({
                    prov: providerOne,
                  });
                }}
              >
                <img
                  src={providerTwo && providerTwo.cover}
                  alt='Silder Image'
                />
                <div className='overlay'>
                  <div>
                    <h3>{providerTwo && providerTwo.serviceName}</h3>
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                      {providerTwo && providerTwo.address}
                    </span>
                    <hr />
                    <p>
                      <FontAwesomeIcon icon={faMobileAlt} />{' '}
                      <span className='categories'>
                        {providerTwo &&
                          providerTwo.categoryName &&
                          providerTwo.categoryName.category}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                className='single-popular'
                onClick={() => {
                  this.setState({
                    prov: providerOne,
                  });
                }}
              >
                <img
                  src={providerThree && providerThree.cover}
                  alt='Silder Image'
                />
                <div className='overlay'>
                  <div>
                    <h3>{providerThree && providerThree.serviceName}</h3>
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                      {providerThree && providerThree.address}
                    </span>
                    <hr />
                    <p>
                      <FontAwesomeIcon icon={faMobileAlt} />{' '}
                      <span className='categories'>
                        {providerThree &&
                          providerThree.categoryName &&
                          providerThree.categoryName.category}
                      </span>
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
        <div className='how-it-work'>
          <h2>How it works</h2>
          <hr />
          <p>
            Morbi varius, nulla sit amet rutrum elementum, est elit finibus
            tellus, ut tristique elit risus at metus.
          </p>
          <Container>
            <div className='content'>
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>
                  Proin dapibus nisl ornare diam varius tempus. Aenean a quam
                  luctus, finibus tellus ut, convallis eros sollicitudin turpis.
                </p>
                <span>01</span>
              </div>
            </div>
            <div className='content'>
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>
                  Proin dapibus nisl ornare diam varius tempus. Aenean a quam
                  luctus, finibus tellus ut, convallis eros sollicitudin turpis.
                </p>
                <span>02</span>
              </div>
            </div>
            <div className='content'>
              <div>
                <FontAwesomeIcon icon={faMapMarked} />
                <h4>Find Interesting Place</h4>
                <p>
                  Proin dapibus nisl ornare diam varius tempus. Aenean a quam
                  luctus, finibus tellus ut, convallis eros sollicitudin turpis.
                </p>
                <span>03</span>
              </div>
            </div>
          </Container>
        </div>
        <div className='clear'></div>
        <div className='mobile-app'>
          <div className='info'>
            <h4>Our App Will Be Available Soon</h4>
            <p>
              In ut odio libero, at vulputate urna. Nulla tristique mi a massa
              convallis cursus. Nulla eu mi magna. Etiam suscipit commodo
              gravida. Lorem ipsum dolor sit amet, conse ctetuer adipiscing
              elit.
            </p>
            <button>
              <FontAwesomeIcon icon={faApple} /> <span>Apple Store</span>
            </button>
            <button>
              <FontAwesomeIcon icon={faAndroid} /> <span>Google Play</span>
            </button>
          </div>
          <div className='app-img'>
            <img src={require(`../../images/api.png`)} alt='API Picture' />
            <div className='img-animation'>
              <img
                src={require(`../../images/animation.jpg`)}
                alt='Animation Picture'
              />
            </div>
          </div>
        </div>
        <div className='our-team'>
          <h2>Our Team</h2>
          <hr />
          <p>This Is Our Developers</p>
          <div>
            <Container>
              <div className='team-img'>
                <img src={require(`../../images/ibrahim.jpg`)} alt='' />
              </div>
              <div className='team-info'>
                <h3>Ibrahim Abu Nemer</h3>
                <p>Back-End Developer</p>
                <ul>
                  <li>
                    <a
                      className='linkedin'
                      href='http://www.linkedin.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='twitter'
                      href='http://www.twitter.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='github'
                      href='https://github.com/IbrahemAtef'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className='team-img'>
                <img src={require(`../../images/abd.jpg`)} alt='' />
              </div>
              <div className='team-info'>
                <h3>Abdulrahmaan</h3>
                <p>Back-End Developer</p>
                <ul>
                  <li>
                    <a
                      className='linkedin'
                      href='http://www.linkedin.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='twitter'
                      href='http://www.twitter.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='github'
                      href='https://github.com/AbdHussein'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className='team-img'>
                <img src={require(`../../images/azzam.jpg`)} alt='' />
              </div>
              <div className='team-info'>
                <h3>Ahmed E. Azzam</h3>
                <p>Team Leader</p>
                <ul>
                  <li>
                    <a
                      className='linkedin'
                      href='http://www.linkedin.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='twitter'
                      href='http://www.twitter.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='github'
                      href='https://github.com/ahmed-azzam'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className='team-img'>
                <img src={require(`../../images/nadera.jpg`)} alt='' />
              </div>
              <div className='team-info'>
                <h3>Nadera Qaoud</h3>
                <p>Front-End Developer</p>
                <ul>
                  <li>
                    <a
                      className='linkedin'
                      href='http://www.linkedin.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='twitter'
                      href='http://www.twitter.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='github'
                      href='https://github.com/Naderaqaoud20'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </div>
            </Container>
          </div>
          <div>
            <Container>
              <div className='team-img'>
                <img
                  className='waked'
                  src={require(`../../images/avatar.png`)}
                  alt=''
                />
              </div>
              <div className='team-info'>
                <h3>Ahmed Abuwaked</h3>
                <p>Front-End Developer</p>
                <ul>
                  <li>
                    <a
                      className='linkedin'
                      href='http://www.linkedin.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='twitter'
                      href='http://www.twitter.com'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li>
                    <a
                      className='github'
                      href='https://github.com/dolphen05'
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
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
