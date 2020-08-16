import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faMapMarkerAlt, faBars, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import Navbar from '../mainComp/navbar';
import Footer from '../footer/footer';
import Constants from '../constants/Queries';

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
      console.log(query);
      const request = await Constants.request(query);
      console.log(request);
      const { user } = request.data.data;
      this.setState({
        user,
      });
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
                  <select
                    name='category'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.category}
                  >
                    <option>choose...</option>
                    <option>phones</option>
                    <option>restaurant</option>
                    {/* <option>PC</option>
                    <option>FMCGs</option> */}
                  </select>
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

        <div className="popular-palces">
          <Container>
            <h2>Popular Palces</h2>
            <hr className="landing-hr" />
            <p>Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum.</p>
            <div className="popular-slider">
              <div className="single-popular">
                <img src={require(`../../images/29.jpg`)} alt="Silder Image" />
                <div className="overlay">
                  <div>
                    <h3>Gym in the center</h3>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} />  70 Bright St New York, USA</span>
                    <hr />
                    <p><FontAwesomeIcon icon={faMobileAlt} /> <span className="categories">Phones</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Landing;
