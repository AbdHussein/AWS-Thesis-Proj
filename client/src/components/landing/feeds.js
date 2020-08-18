import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../mainComp/navbar';
import Constants from '../constants/Queries';
import { Redirect } from 'react-router-dom';

class Feeds extends React.Component {
  state = {
    user: null,
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
  }

  render() {
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
      <div className='feeds'>
        <Navbar provider={this.state.user} />
        <header>
          <div className='overlay'>
            <Container>
              <h2>Our Last News</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec
                tincidunt arcu, sit amet fermentum sem.
              </p>
            </Container>
          </div>
        </header>
        <Container>
          <div className='feeds-content'>
            {/* Start Post */}
            <div className='feeds-post'>
              <div className='feeds-img'>
                <img
                  src={require(`../../images/unnamed.jpg`)}
                  alt='Feeds Image'
                />
              </div>
              <div className='feeds-post-content'>
                <p>
                  Ut euismod ultricies sollicitudin. Curabitur sed dapibus
                  nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam
                  in mauris quis libero sodales eleifend. Morbi varius, nulla
                  sit amet rutrum elementum, est elit finibus tellus, ut
                  tristique elit risus at metus.
                </p>
                <hr />
                <FontAwesomeIcon icon={faCalendar} /> <span>25 April 2018</span>{' '}
                <button>
                  Read More <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            {/* End Post */}
          </div>
          <div className='feeds-sidebar'>Test From Sidebar</div>
        </Container>
      </div>
    );
  }
}

export default Feeds;
