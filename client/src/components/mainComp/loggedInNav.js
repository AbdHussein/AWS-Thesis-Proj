import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

class LoggedInNavbar extends React.Component {
  state = {
    loggedOut: false,
  };

  componentDidMount() {
    $('.user-logged-info').click(function () {
      $('.user-details ul').slideToggle();
    });
  }

  logOut() {
    localStorage.removeItem('xTown');
    this.setState({
      loggedOut: true,
    });
  }

  render() {
    if (this.state.loggedOut) {
      return (
        <Redirect
          to={{
            pathname: `/`,
          }}
        />
      );
    }
    return (
      <div className='logged-nav'>
        <div className='user-logged-info'>
          <Avatar className='avatar'>D</Avatar>{' '}
          <span>
            Hello, Doly test <FontAwesomeIcon icon={faChevronDown} />{' '}
          </span>
        </div>
        <div className='user-details'>
          <ul>
            <li>Edit Profile</li>
            <li onClick={this.logOut.bind(this)}>Logout</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default LoggedInNavbar;
