import React from 'react';
import { Container } from '@material-ui/core';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LoggedOutNavbar from './loggedOutNav';
import LoggedInNavbar from './loggedInNav';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Container>
          <div className='brand'>
            <EmojiTransportationIcon /> x<span>-town</span>
          </div>
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
