import React from 'react';
import $ from 'jquery';
import { Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import DemoVideo from './details/demoVideo';
import Description from './details/description';
import Facility from './details/facility';
import Add from './posts/addPost';
import Show from './posts/showPost';
import DashProviderInfo from './dashProviderInfo';
import MainDashboard from './mainDashboard';
import Navbar from '../mainComp/navbar';
import Constants from '../constants/Queries';
import StoreDashboard from './storeDashboard';

class Dashboard extends React.Component {
  state = {
    provider: null,
  };

  async componentDidMount() {
    $('.dash-posts').click(function () {
      $('.dash-show-add').slideToggle();
    });
    $('.dash-details').click(function () {
      $('.dash-des').slideToggle();
    });

    $('.dashboard-sidebar div').on('click', function () {
      let dashboard = $(this).data('dashboard');
      $(dashboard).show().siblings().hide();
    });

    const query = Constants.getUserByToken(localStorage.getItem('xTown'));
    const request = await Constants.request(query);
    const provider = request.data.data.user;
    this.setState({
      provider,
    });
  }

  render() {
    return (
      <div className='dashboard'>
        <Navbar provider={this.state.provider} />
        <div className='dashboard-header'>
          <h3>
            Welcome:{' '}
            {this.state.provider !== null ? this.state.provider.username : ''}
          </h3>
        </div>
        <div className='dashboard-nav'>
          <div className='dashboard-avatar'>
            <Avatar className='avatar'>
              {this.state.provider !== null
                ? this.state.provider.username[0]
                : ''}
            </Avatar>
          </div>
        </div>
        <div className='main-dashboard'>
          <Container>
            <div className='dashboard-sidebar'>
              <div data-dashboard='.ch-dash-main-dashboard' className='dash'>
                Dashboard
              </div>
              <div className='dash-posts'>Posts</div>
              <div className='dash-show-add'>
                <div data-dashboard='.dash-add-post'>Add</div>
                <div data-dashboard='.dash-show-post'>Show</div>
              </div>
              <div className='dash-details'>Details</div>
              <div className='dash-des'>
                <div data-dashboard='.dash-demo'>Demo Video</div>
                <div data-dashboard='.dash-describe'>Description/Gallery</div>
                <div id='fac' data-dashboard='.dash-facility'>
                  Facility
                </div>
              </div>
              <div
                data-dashboard='.dash-provider-information'
                className='dash-provider-info'
              >
                Provider Info
              </div>
              <div data-dashboard='.store-dash'>Store Dashboard</div>
            </div>
            <div className='dashboard-content'>
              <div className='ch-dash-main-dashboard'>
                <MainDashboard />
              </div>
              <div className='dash-demo'>
              {this.state.provider && (
                 <DemoVideo id={this.state.provider.id} />
                )}
              </div>
              <div className='dash-describe'>
                {this.state.provider && (
                  <Description id={this.state.provider.id} />
                )}
                 
              </div>
              <div className='dash-facility'>
                <Facility />
              </div>
              <div className='dash-add-post'>
                <Add />
              </div>
              <div className='dash-show-post'>
                <Show />
              </div>
              <div className='dash-provider-information'>
                <DashProviderInfo />
              </div>
              <div className='store-dash'>
              {this.state.provider && (
                  <StoreDashboard provider = {this.state.provider} />
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Dashboard;
