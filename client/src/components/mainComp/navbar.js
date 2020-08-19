import React from 'react';
import { Container } from '@material-ui/core';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LoggedOutNavbar from './loggedOutNav';
import LoggedInNavbar from './loggedInNav';
import { Redirect } from 'react-router-dom';

class Navbar extends React.Component {

  render() {
    return (
      <nav>
        <Container>
          <div className='brand'>
            <a href="/"><img src={require(`../../images/logo.png`)} alt="Logo Image" /> <span>Town</span></a>
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/feeds">Feeds</a></li>
          </ul>
          {localStorage.getItem('xTown') ? (
            <LoggedInNavbar provider={this.props.provider} />
          ) : (
              <LoggedOutNavbar />
            )}
        </Container>
      </nav>
    );
  }
}

export default Navbar;
