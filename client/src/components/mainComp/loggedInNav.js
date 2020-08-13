import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

class LoggedInNavbar extends React.Component {
  state = {
    loggedOut: false,
    userData: {}
  };

  componentDidMount() {
    $('.user-logged-info').click(function () {
      $('.user-details ul').slideToggle();
    });
    const data = jwt.verify(localStorage.getItem('xTown'), "somesuperdupersecret", {
      algorithm: "HS256"
    });
    this.setState({
      userData : data
    }, ()=> {
      console.log(this.state.userData);
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
    const {username} = this.state.userData ;

    return (      
      <div className='logged-nav'>
        <div className='user-logged-info'>
          <Avatar className='avatar'>
            {this.props.provider !== null
              ? this.props.provider.username[0]
              : ''}
          </Avatar>{' '}
          <span>
            Hello,{' '}
            {this.props.provider !== null ? this.props.provider.username : ''}{' '}
            <FontAwesomeIcon icon={faChevronDown} />{' '}
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
