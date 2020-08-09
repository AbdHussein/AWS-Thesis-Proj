import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import Navbar from '../mainComp/navbar';

class Landing extends React.Component {
  state = {
    search: '',
    location: '',
    category: '',
    done: false,
  };

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
        <Navbar />
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
                  <FontAwesomeIcon icon={faKeyboard} />
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
                  <FontAwesomeIcon icon={faKeyboard} />
                  <select
                    name='category'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.category}
                  >
                    <option>choose...</option>
                    <option>phones</option>
                    <option>restaurant</option>
                    <option>PC</option>
                    <option>FMCGs</option>
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
      </div>
    );
  }
}

export default Landing;
