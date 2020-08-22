import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../mainComp/navbar';
import Footer from '../footer/footer';
import Constants from '../constants/Queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class WishList extends React.Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    console.log(localStorage.getItem('xTown'));
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
      <div className='wish-list'>
        <Navbar provider={this.state.user} />
        <div className='clear'></div>
        <Container>
          <div className='wish-list-content'>
            <div className='list-item'>
              <div className='item-img'>
                <img src={require(`../../images/29.jpg`)} alt='Item Picture' />
              </div>
              <div className='item-info'>
                <h3>Item Heading</h3>
                <span>33$</span>
              </div>
              <div className='item-options'>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </div>
          </div>
          <div className='wish-list-sidebar'>
            <img src={require(`../../images/ads2.png`)} alt="Ads Photo" />
          </div>
        </Container>
        <div className='clear'></div>
        <Footer />
      </div>
    );
  }
}

export default WishList;
